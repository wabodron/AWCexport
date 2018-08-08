import boxReducer from './boxReducer'
import { combineReducers } from 'redux';

function create2DNamedReducer(reducerFunction, reducerRow, reducerColumn) {
    //actions dispatched into the reducer returned by this function require a row and column to reference
    return (state, action) => {
        const { row } = action;
        const { column } = action;
        if( state === undefined ) {
            return reducerFunction(state, action);
        }
        if( row === reducerRow && column === reducerColumn ) {
            return reducerFunction(state, action);
        }
        return state;
    }
}

let pairs = []
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        pairs.push([i, j]);
    }
}

function reducerList(pairs) {
    return( pairs.map((pair) => create2DNamedReducer(boxReducer, pair[0], pair[1])))
}

export default combineReducers({
    ...reducerList(pairs) //object literal definition shorthand
})

// while (!done) {
//   let g = generator.next();
//   done = g.done;
//   console.log(...g.value)
//   create2DNamedReducer(boxReducer, g.value[0], g.value[1])
// }