import { logoCount } from '$lib/stores';
import { get } from 'svelte/store';
import { gameConfig } from '../config';
import Actor from '../actors/Actor';

export default class GameScene extends Phaser.Scene {
    private player!: Phaser.GameObjects.Sprite;
    private goal!: Phaser.GameObjects.Sprite;
    private enemy!: Actor;

    private enemies!: Phaser.GameObjects.Group;

    constructor() {
        super('main');
    }

    create() {
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);

        this.player = this.add.sprite(40, gameConfig.height / 2, 'player');
        this.player.setScale(0.5);

        this.goal = this.add.sprite(gameConfig.width - 80, gameConfig.height / 2, 'goal');
        this.goal.setScale(0.6)

        this.enemy = new Actor(this, 120, gameConfig.height / 2, 'enemy');

        this.enemies = this.add.group();
        this.enemies.add(this.enemy);
    }

    update() {

        if (this.input.activePointer.isDown) {
            this.player.x += gameConfig.playerSpeed;
        }

        // treasure overlap check
        let playerRect = this.player.getBounds();
        let treasureRect = this.goal.getBounds();

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {

            this.scene.restart();
            return;
        }

        // enemy movement
        this.enemy.move();
    }
}
