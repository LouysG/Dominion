import Card from './Card.js';
import full from '../Resources/Cards/province-full.jpg';
import half from '../Resources/Cards/province-half.jpg';

export default class Province extends Card {
    constructor(id) {
        super('Province', id, 'victory', 8);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = []
    }
}