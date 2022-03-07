import React from 'react';
import { useSelector} from 'react-redux';
import cardBack from '../../../Resources/Cards/card-back.png'

function selectPlayerTray (state) {
    if (state.playerTray !== undefined) {
        return state.playerTray;
    }
    return state;
}

function Deck (props) {
    let deck = useSelector(selectPlayerTray).player1.deck
    let topDeck;
    if (deck.length) {
        topDeck = (
            <div id='deck' style={{backgroundImage: `url(${cardBack})`}}>
                <p id='stackCount'>{deck.length}</p>
            </div>
        )
    } else {
        topDeck = (
            <div id='deck'>
            </div>
        )
    }
    
    return (
        [topDeck]
    )
}


export default Deck;

