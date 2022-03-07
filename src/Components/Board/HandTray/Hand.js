import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardWrapper from '../../CardWrapper.js';
import leftArrow from '../../../Resources/left-arrow.png';
import rightArrow from '../../../Resources/right-arrow.png';

function selectPlayer1 (state) {
    if (state.playerTray !== undefined) {
        return state.playerTray.player1;
    }
    return state;
}

function selectSelectionCriteria (state) {
    if (state.selectionCriteria !== undefined) {
        return state.selectionCriteria;
    }
    return state;
}

function Hand (props) {
    const dispatch = useDispatch();
    const player1 = useSelector(selectPlayer1);
    const selectionCriteria = useSelector(selectSelectionCriteria);
    const hand = player1.hand;
    const handSegment = player1.handSegment;
    let visibleCards = [];

    //Display arrows if neccesary
    let leftArrowImage;
    let rightArrowImage
    if (hand.length > 5 || handSegment > 0) {
        leftArrowImage = (
            <img id={'handLeftArrow'} src={leftArrow}></img>
        )
        rightArrowImage = (
            <img id={'handRightArrow'} src={rightArrow}></img>
        )
    }

    function scrollLeft (state) {
        if (handSegment > 0) {
            dispatch({type: 'decrementHandSegment', player: 'player1'});
        }
    }
    
    function scrollRight (state) {
        let segments = Math.ceil(hand.length / 5);
        if (handSegment + 1 < segments) {
            dispatch({type: 'incrementHandSegment', player: 'player1'});
        }
    }

    function isSelectable (card, criteria) {
        let locationMatches = true;
        let typeMatches = true;
        let costMatches = true;
        let nameMatches = true;

        if (criteria.unselectEverything === true) {
            return false;
        }
        if (criteria.location[0]) {
            if (!criteria.location.includes('player1Hand')) {
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

    
    for (let i = 1; i < 6; i++) {
        if (hand[i - 1 + (5 * handSegment)]) {
            let selectable = isSelectable(hand[i - 1 + (5 * handSegment)], selectionCriteria)
            visibleCards.push(
                <CardWrapper id={'handCard' + i}
                    card={hand[i - 1 + (5 * handSegment)]} 
                    selectable={selectable} 
                    imageSize='full'
                    location='player1Hand'>
                </CardWrapper>
            ) 
        } else {
            visibleCards.push(null);
        }
    }

    return (
        <div id='hand'>
            <div id='leftArrow' onClick={scrollLeft}>
                {leftArrowImage}
            </div>
            {visibleCards}
            <div id='rightArrow' onClick={scrollRight}>
                {rightArrowImage}
            </div>
        </div>
    )
}

export default Hand;