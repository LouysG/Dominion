import buttonReducer from './buttonReducer.js'

export default function optionalButtonsReducer (state, action) {
    if (action.type === 'clearOptionalButtons') {
        return {
            button1: {
                visible: false,
                text: '',
                onSelect: '',
            },
            button2: {
                visible: false,
                text: '',
                onSelect: '',
            },
            button3: {
                visible: false,
                text: '',
                onSelect: '',
            }
        }
    }


    switch (action.button) {
        case 'button1':
            return {
                ...state,
                button1: buttonReducer(state.button1, action), 
            }
        case 'button2':
            return {
                ...state,
                button2: buttonReducer(state.button2, action), 
            }
        case 'button3':
            return {
                ...state,
                button3: buttonReducer(state.button3, action), 
            }
        default:
            return state;
    }
}