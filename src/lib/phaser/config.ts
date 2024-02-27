import Phaser from 'phaser';

import LoadingSplash from './scenes/Splash';
import PreloaderScene from './scenes/PreloaderScene';
import GameScene from './scenes/GameScene';

export const gameConfig = {
    width: 640,
    height: 360,
};

export const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    width: gameConfig.width,
    height: gameConfig.height,
    pixelArt: true,
    transparent: true,


    scene: [LoadingSplash, PreloaderScene, GameScene]
};
