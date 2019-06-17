var game = new Phaser.Game({
    type: Phaser.HEADLESS,
    parent: 'game',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    width: 800,
    height: 600
})