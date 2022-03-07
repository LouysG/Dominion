import Card from './Card.js';
import fullCopper from '../Resources/Cards/copper-full.jpg';
import halfCopper from '../Resources/Cards/copper-half.jpg';

export default class Copper extends Card {
    constructor(id) {
        super('Copper', id, 'treasure', 0);
        this.fullImage = fullCopper;
        this.halfImage = halfCopper;
        this.effects = 1
    }
}