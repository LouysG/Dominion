import Card from './Card.js';
import full from '../Resources/Cards/duchy-full.jpg';
import half from '../Resources/Cards/duchy-half.jpg';

export default class Duchy extends Card {
    constructor(id) {
        super('Duchy', id, 'victory', 5);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = []
    }
}