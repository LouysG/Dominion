function shuffle(array) {
    let copy = [...array];

    /*
    Since I ripped this code from Stack Overflow I owe my future self an explanation of how it
    works.

    This is called the Fisher-Yates algorithm, it's used to shuffle arrays. It works by iterating
    through the passed array. It begins with the last element in the array and switchs it at
    random with an element whose index is less than or equal to its own. From there it works
    its way towards the front of the array, performing the same process on each element until it
    reaches the first and stops.
    */
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }
    return copy
}

export function deckReducer(state, action) {
    switch (action.type) {
        case 'addToTop':
            return [
                action.payload,
                ...state
            ]
        case 'removeFromTop':
            return state.slice(1);
        case 'shuffle':
            return shuffle(state);
        case 'removeFromDeck':
            let alreadyRemoved = false;
            return state.filter(card => {
                if (alreadyRemoved) {
                    return true;
                }
                if (card.id === action.payload.id) {
                    alreadyRemoved = true;
                    return false;
                }
                return true;
            })
        default:
            return state;
    }
}