import Card from './Card.js';
import full from '../Resources/Cards/gold-full.jpg';
import half from '../Resources/Cards/gold-half.jpg';

export default class Gold extends Card {
    constructor(id) {
        super('Gold', id, 'treasure', 6);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = 3
    }
}