import React from "react";
import '../../../CSS/PlayerTray.css';
import Player from './Player';
import { useSelector } from 'react-redux';

function selectPlayerTray (state) {
    if (state !== undefined) {
        return state.playerTray
    }
    return state;
}

function PlayerTray (props) {
    const playerTray = useSelector(selectPlayerTray);


    /*
    let playerDivs = [];
    if (playerTray !== undefined) {
        for (let i = 1; i < 5; i++) {
            let players = Object.keys(playerTray);
            let player = players[i - 1];
            playerDivs.push(
                <Player id={'Player' + i} 
                    name={playerTray[player].name} 
                    points={playerTray[player].victoryPoints}>
                </Player>
            )
        }
    }
    */

    return (
        <div id='PlayerTray'>
            <Player id={'Player1'} 
                    name={playerTray['player1'].name} 
                    points={playerTray['player1'].victoryPoints}>
            </Player>
            <Player id={'Player2'} 
                    name={playerTray['player2'].name} 
                    points={playerTray['player2'].victoryPoints}>
            </Player>
            <Player id={'Player4'} 
                    name={playerTray['player4'].name} 
                    points={playerTray['player4'].victoryPoints}>
            </Player>
        </div>
    )
}

export default PlayerTray;