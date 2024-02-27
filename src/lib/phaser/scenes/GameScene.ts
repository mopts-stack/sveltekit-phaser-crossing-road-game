import { logoCount } from '$lib/stores';
import { get } from 'svelte/store';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('main');
    }

    create() {
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);

        let player = this.add.sprite(70, 180, 'player');
        player.setScale(0.5);

        let enemy = this.add.sprite(250, 180, 'enemy');
        enemy.setScale(1.5);
        enemy.flipX = true;
    }
}
