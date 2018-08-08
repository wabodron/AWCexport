import { combineReducers } from 'redux';

let initialState = {
    visibilities: {
        AcctBox: true,
        SearchBox: false,
        SearchResults: false,
        ItemInfo: false
    },
    searchField: [''],
    value: '',
    id: ''
};

const SmartInputReducer = (state = initialState, action) => {
    switch (action.type) {
        case "HIDE":
            return { ...state, visibilities: { ...state.visibilities, [action.component]: false }};
        case "SHOW":
            return {
                ...state, visibilities: { ...state.visibilities, [action.component]: true }
            };
        case "SEARCH":
            return {
                ...state, searchField: action.field
            };
        case "SETVALUE":
            return {
                ...state, value: action.value
            }
        default:
            return state;
    }
};

function createNamedWrapperReducer(reducerFunction, reducerName) {
    return (state, action) => {
        const { name } = action;
        const isInitializationCall = state === undefined;
        if (name !== reducerName && !isInitializationCall) return state;

        return reducerFunction(state, action)
    }
}

const rootReducer = combineReducers({
    SmartInputBoxA: createNamedWrapperReducer(SmartInputReducer, 'A'),
    SmartInputBoxB: createNamedWrapperReducer(SmartInputReducer, 'B'),
})

export default rootReducer