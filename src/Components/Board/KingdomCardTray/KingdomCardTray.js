import '../../../CSS/KingdomCardTray.css';
import { useSelector } from 'react-redux';
import CardWrapper from '../../CardWrapper'; 


function selectSelectionCriteria (state) {
    if (state.selectionCriteria !== undefined) {
        return state.selectionCriteria;
    }
    return state;
}

function selectKingdomCardTray (state) {
    if (state !== undefined) {
        return state.kingdomCardTray;
    }
    return state;
}

function KingdomCardTray (props) {
    const kingdomCardTray = useSelector(selectKingdomCardTray);
    const selectionCriteria = useSelector(selectSelectionCriteria);
    let topCards = [
        kingdomCardTray.kingdomStack1[0],
        kingdomCardTray.kingdomStack2[0],
        kingdomCardTray.kingdomStack3[0],
        kingdomCardTray.kingdomStack4[0],
        kingdomCardTray.kingdomStack5[0],
        kingdomCardTray.kingdomStack6[0],
        kingdomCardTray.kingdomStack7[0],
        kingdomCardTray.kingdomStack8[0],
        kingdomCardTray.kingdomStack9[0],
        kingdomCardTray.kingdomStack10[0],
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
            if (!criteria.location.includes('kingdomCardTray')) {
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

    let visibleKingdomCards = [];
    for (let i = 1; i < 11; i++) {
        if (topCards[i - 1]) {
            let selectable = isSelectable(topCards[i - 1], selectionCriteria)
            visibleKingdomCards.push(
                <CardWrapper id={'kingdomCard' + i}
                    card={topCards[i - 1]} 
                    selectable={selectable} 
                    imageSize='half'
                    location={'kingdomStack' + i}
                    stackCount={kingdomCardTray['kingdomStack' + i].length}>
                </CardWrapper>
                
            ) 
        } else {
            visibleKingdomCards.push(null);
        }
    }

    return (
        <div id='kingdomCardTray'>
           {visibleKingdomCards}
        </div>
    )
}

export default KingdomCardTray;