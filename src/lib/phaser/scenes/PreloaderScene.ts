export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        // add stuff to load here 👇
        const loaders: (() => void)[] = [
            () => {
                this.load.image('background', 'assets/background.png');
                this.load.image('enemy', 'assets/dragon.png');
                this.load.image('player', 'assets/player.png');
                this.load.image('treasure', 'assets/treasure.png');
            }
        ];

        this.loadAndSendUpdates(loaders);
    }

    private loadAndSendUpdates(preloadList: (() => void)[]) {
        const totalToLoad = preloadList.length;
        let loadedCount = 0;

        // Listen for the 'filecomplete' event and update the progress
        this.load.on('filecomplete', () => {
            loadedCount++;
            const percentageComplete = loadedCount / totalToLoad;
            this.scene.get('splash').events.emit('set_loader_progress', percentageComplete);
        });

        // Trigger the load process
        preloadList.forEach((load) => load());
    }

    create() {
        this.scene.get('splash').events.emit('set_loader_progress', 1);
        this.time.delayedCall(50, () => {
            this.scene.stop('splash');
            this.scene.start('main');
        });
    }
}
