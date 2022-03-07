import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../CSS/board.css';
import BaseCardTray from './BaseCardTray/BaseCardTray';
import HandTray from './HandTray/HandTray';
import KindgdomCardTray from './KingdomCardTray/KingdomCardTray';
import PlayArea from './PlayArea/PlayArea';
import PlayerTray from './PlayerTray/PlayerTray';

function selectGameLoop (state) {
    if (state.gameLoop !== undefined) {
        return state.gameLoop;
    }
    return state;
}

function Board (props) {
    const dispatch = useDispatch();
    const gameLoop = useSelector(selectGameLoop)
    let winner = gameLoop.victoryScreen.winner
    let victoryScreenIsVisible = gameLoop.victoryScreen.victoryScreenIsVisible;

    function handlePlayAgain () {
        dispatch({type: 'resetState'})
    }


    let victoryScreen;
    if (victoryScreenIsVisible === true) {
        victoryScreen = (
            <div id='victoryScreen'>
                <p id='winnerText'>{winner + ' Emerges Victorious!'}</p>
                <div id='playAgainButton' onClick={handlePlayAgain}>
                    <p id='playAgainText'>Play Again?</p>
                </div>
            </div>
        )
    }

    return (
        <div id='board'>
            <BaseCardTray/>
            <HandTray/>
            <KindgdomCardTray/>
            <PlayArea/>
            <PlayerTray/>
            {victoryScreen}
        </div>
    )
}

export default Board;