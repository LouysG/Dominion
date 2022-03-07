import Card from './Card.js';
import full from '../Resources/Cards/gardens-full.jpg';
import half from '../Resources/Cards/gardens-half.jpg';

export default class Gardens extends Card {
    constructor(id) {
        super('Gardens', id, 'victory', 4);
        this.fullImage = full;
        this.halfImage = half;
        this.effects = []
    }
}