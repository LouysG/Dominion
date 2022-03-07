import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function selectBaseCardTray (state) {
    if (state.baseCardTray !== undefined) {
        return state.baseCardTray;
    }
    return state;
}

function Trash(props) {
    let baseCardTray = useSelector(selectBaseCardTray)
    let dispatch = useDispatch()
    let trash = baseCardTray.trash

    function handleTrash () {
        dispatch({type: 'setCanPass', payload: false})
        dispatch({type: 'setSelectorTrayVisibility', payload: true})
        dispatch({type: 'addArrayToSelectorTray', payload: trash})
        dispatch({type: 'setButton', button: 'button1', payload: {
            visible: true,
            text: 'Done',
            onSelect: 'stopViewingTrash',
        }})
    }

    return (
        <div id='trash' onClick={handleTrash}>
            <p id='stackCount'>{trash.length}</p>
        </div>
    )
}

export default Trash;