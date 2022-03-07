import Card from './Card.js';
import full from '../Resources/Cards/curse-full.jpg';
import half from '../Resources/Cards/curse-half.jpg';

export default class Curse extends Card {
    constructor(id) {
        super('Curse', id, 'curse', 0);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = []
    }
}