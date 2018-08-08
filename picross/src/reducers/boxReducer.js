const initialState = {
    flagged: false,
    colored: false
}

export default function boxReducer(state = initialState, action) {
    switch(action.type) {
        case 'FLAG': 
            return {
                ...state,
                flagged: !state.flagged
            }
        case 'COLOR':
            return {
                ...state,
                colored: !state.colored
            }
        default:
            return state;
    }
}