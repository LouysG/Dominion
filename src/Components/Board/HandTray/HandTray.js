import React from "react";
import '../../../CSS/HandTray.css';
import Deck from './Deck';
import Hand from './Hand';
import Discard from './Discard';

function HandTray (props) {
    return (
        <div id='handTray'>
            <Deck/>
            <Hand/>
            <Discard/>
        </div>
    )
}

export default HandTray;