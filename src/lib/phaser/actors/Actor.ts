import { gameConfig } from "../config";

export default class Actor extends Phaser.GameObjects.Sprite {
    public speed = 1;

    private sprite: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
        super(scene, x, y, texture, frame);


        let dir = Math.random() < 0.5 ? 1 : -1;
        this.speed = dir * (gameConfig.enemyMinSpeed + Math.random() * (gameConfig.enemyMaxSpeed - gameConfig.enemyMinSpeed));

        this.sprite = scene.add.sprite(x, y, texture);
        this.sprite.flipX = true;
        this.sprite.setScale(0.6);
    }

    public move() {
        this.y += this.speed;
        this.sprite.y = this.y;

        const conditionUp = this.speed < 0 && this.y <= gameConfig.enemyMinY;
        const conditionDown = this.speed > 0 && this.y >= gameConfig.enemyMaxY;

        // if we haven't passed the min Y
        // or we haven't passed the max Y
        if (conditionUp || conditionDown) {
            this.speed *= -1;
        }
    }
}