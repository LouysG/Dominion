import Card from './Card.js';
import full from '../Resources/Cards/estate-full.jpg';
import half from '../Resources/Cards/estate-half.jpg';

export default class Estate extends Card {
    constructor(id) {
        super('Estate', id, 'victory', 2);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = []
    }
}