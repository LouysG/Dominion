export default function activePlayerReducer (state, action) {
    if (action.type === 'incrementActivePlayer') {
        if (state === 'player1') {
            return 'player2'
        }
        if (state === 'player2') {
            return 'player4'
        }
        if (state === 'player3') {
            return 'player4'
        }
        if (state === 'player4') {
            return 'player1'
        }
    }
    return state;
}