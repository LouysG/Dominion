import Card from './Card.js';
import full from '../Resources/Cards/silver-full.jpg';
import half from '../Resources/Cards/silver-half.jpg';

export default class Silver extends Card {
    constructor(id) {
        super('Silver', id, 'treasure', 3);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = 2
    }
}