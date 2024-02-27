import { stat } from '$lib/stores';
import { get } from 'svelte/store';
import { gameConfig } from '../config';

export default class GameScene extends Phaser.Scene {
    private player!: Phaser.GameObjects.Sprite;
    private goal!: Phaser.GameObjects.Sprite;

    private enemies!: Phaser.GameObjects.Group;

    private isTerminating = false;

    constructor() {
        super('main');
    }

    create() {
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);

        this.player = this.add.sprite(40, (gameConfig.height / 2) + 20, 'player');
        this.player.setScale(0.5);

        this.goal = this.add.sprite(gameConfig.width - 80, gameConfig.height / 2, 'goal');
        this.goal.setScale(0.6)

        this.enemies = this.add.group({
            key: 'enemy',
            repeat: 5,
            setXY: {
                x: 90,
                y: 100,
                stepX: 80,
                stepY: 20,
            }
        });

        Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4);
        Phaser.Actions.Call(this.enemies.getChildren(), function (enemy) {
            (enemy as Phaser.GameObjects.Sprite).flipX = true;

            let dir = Math.random() < 0.5 ? 1 : -1;
            let speed = dir * (gameConfig.enemyMinSpeed + Math.random() * (gameConfig.enemyMaxSpeed - gameConfig.enemyMinSpeed));
            enemy.setData('speed', speed);
        }, this);

        this.isTerminating = false;
    }

    update() {

        if (this.isTerminating) {
            return;
        }

        if (this.input.activePointer.isDown) {
            this.player.x += gameConfig.playerSpeed;
        }

        // treasure overlap check
        let playerRect = this.player.getBounds();
        let treasureRect = this.goal.getBounds();

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
            return this.gameOver(true);
        }

        // enemy movement
        let enemies = this.enemies.getChildren() as Phaser.GameObjects.Sprite[];

        enemies.forEach(enemy => {
            let speed = enemy.getData('speed');
            enemy.y += enemy.getData('speed');

            const conditionUp = speed < 0 && enemy.y <= gameConfig.enemyMinY;
            const conditionDown = speed > 0 && enemy.y >= gameConfig.enemyMaxY;

            // if we haven't passed the min Y
            // or we haven't passed the max Y
            if (conditionUp || conditionDown) {
                enemy.setData('speed', speed * -1);
            }

            let enemyRect = enemy.getBounds();

            if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
                return this.gameOver(false);
            }
        })
    }

    private gameOver(win: boolean) {
        if (win) {
            stat.set({
                death: get(stat).death,
                wins: get(stat).wins + 1
            })
        } else {
            stat.set({
                death: get(stat).death + 1,
                wins: get(stat).wins
            })
        }

        this.isTerminating = true;

        this.cameras.main.shake(gameConfig.shakeTime);

        setTimeout(() => {
            this.cameras.main.fade(gameConfig.shakeTime);
        }, gameConfig.shakeTime);

        setTimeout(() => {
            this.scene.restart();
        }, gameConfig.shakeTime * 2);
    }
}
