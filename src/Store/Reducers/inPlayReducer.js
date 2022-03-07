export default function inPlayReducer (state, action) {
    switch(action.type) {
        case 'addToPlayArea':
            return [
                ...state,
                action.payload
            ]
        case 'clearPlayArea':
            return [];
        default:
            return state;
    }
}