import React from 'react';
import { useSelector } from 'react-redux';
import CardWrapper from '../../CardWrapper.js';

function selectPlayer1 (state) {
    if (state.playerTray !== undefined) {
        return state.playerTray.player1;
    }
    return state;
}

function Discard (props) {
    const player1 = useSelector(selectPlayer1);
    const discard = player1.discard

    let topCard= null
    if (discard[0]) {
        topCard = <CardWrapper id={'topCard'}
                    card={discard[0]} 
                    selectable={false} 
                    imageSize='full'
                    location='player1Discard'
                    stackCount={discard.length}>
                </CardWrapper>
    }


    return (
        <div id='discard'>
            {topCard}
        </div>
    )
}

export default Discard;