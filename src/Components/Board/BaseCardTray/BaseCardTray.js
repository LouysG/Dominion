import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import '../../../CSS/BaseCardTray.css';
import Trash from './Trash';
import CardWrapper from '../../CardWrapper.js'


function selectSelectionCriteria (state) {
    if (state.selectionCriteria !== undefined) {
        return state.selectionCriteria;
    }
    return state;
}

function selectBaseCardTray (state) {
    if (state.baseCardTray !== undefined) {
        return state.baseCardTray;
    }
    return state;
}

function BaseCardTray (props) { 
    const dispatch = useDispatch();
    const selectionCriteria = useSelector(selectSelectionCriteria);
    const baseCardTray = useSelector(selectBaseCardTray);
    const topCards = [
        baseCardTray.copperStack[0],
        baseCardTray.silverStack[0],
        baseCardTray.goldStack[0],
        baseCardTray.estateStack[0],
        baseCardTray.duchyStack[0],
        baseCardTray.provinceStack[0],
        baseCardTray.curseStack[0],
    ];

    function isSelectable (card, criteria) {
        let locationMatches = true;
        let typeMatches = true;
        let costMatches = true;
        let nameMatches = true;

        if (criteria.unselectEverything === true) {
            return false;
        }
        if (criteria.location[0]) {
            if (!criteria.location.includes('baseCardTray')) {
                locationMatches = false;
            }
        }
        if (criteria.type[0]) {
            if (!criteria.type.includes(card.type)) {
                typeMatches = false;
            }
        }
        if (criteria.cost[0]) {
            if (criteria.cost[0] === '<') {
                if (card.cost >= criteria.cost[1]) {
                    costMatches = false;
                }
            }
            if (criteria.cost[0] === '>') {
                if (card.cost <= criteria.cost[1]) {
                    costMatches = false;
                }
            }
            if (criteria.cost[0] === '=') {
                if (card.cost !== criteria.cost[1]) {
                    costMatches = false;
                }
            }
        }
        if (criteria.name) {
            if (card.name !== criteria.name) {
                nameMatches = false;
            }
        }
        if (locationMatches && typeMatches && costMatches && nameMatches) {
            return true;
        }
        return false;
    }

    let visibleBaseCards = [];
    for (let i = 0; i < 7; i++) {
        if (topCards[i]) {
            let selectable = isSelectable(topCards[i], selectionCriteria)
            visibleBaseCards.push(
                <CardWrapper id={topCards[i].name}
                    card={topCards[i]} 
                    selectable={selectable} 
                    imageSize='half'
                    location={topCards[i].name.toLowerCase() + 'Stack'}
                    stackCount={baseCardTray[topCards[i].name.toLowerCase() + 'Stack'].length}>
                </CardWrapper>
            ) 
        } else {
            visibleBaseCards.push(null);
        }
    }

    function handleTrash () {
        dispatch({type: 'setCanPass', payload: 'false'})
        dispatch({type: 'setSelectorTrayVisibility', payload: true})
        dispatch({type: 'addArrayToSelectorTray', payload: baseCardTray.trash})
        dispatch({type: 'setButton', button: 'button1', payload: {
            visible: true,
            text: 'Done',
            onSelect: 'stopViewingTrash',
        }})
    }
    
    return (
        <div id='baseCardTray'>
            {visibleBaseCards}
            <Trash/>
            <div id='rulesBox'>
                <a id='rulesLink' 
                href='https://www.riograndegames.com/wp-content/uploads/2016/09/Dominion-2nd-Edition-Rules.pdf'
                target='_blank'
                rel='noopener noreferrer'>{'Rules'}</a>
            </div> 
        </div>
    )
}

export default BaseCardTray;