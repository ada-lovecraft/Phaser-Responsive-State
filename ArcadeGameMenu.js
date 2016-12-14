import ArcadeState from 'GameStates/Shared/ArcadeState'

const {min, max, random} = Math;



export default class ArcadeGameMenuState extends ArcadeState {
  init(props = {}) {
    super.init(props);
    let game = this.game;

    this.gameTitle = props.gameTitle || 'GENERIC GAME TITLE';
    this.titleFontSize = props.titleFontSize || 48;

    if (!game.cache.checkBitmapDataKey('menu-button')) {
      console.log('creating menu button bmd');
      let w = game.world.width - 10;
      console.log('w:');
      let bmd = game.make.bitmapData(this.targetWidth - 10, 100);
      let ctx = bmd.ctx;
      ctx.strokeStyle = '#FF00FF';
      ctx.lineWidth = 4
      ctx.rect(2, 2, bmd.width - 4, 96);
      ctx.stroke();
      this.game.cache.addBitmapData('menu-button', bmd);
      console.log('menu-button exits in cache:', game.cache.checkBitmapDataKey('menu-button'));
    }
    if (!game.cache.checkBitmapDataKey('menu-bg')) {
      console.log('creating menu button bmd');
      let w = this.targetWidth;
      let h = this.targetHeight;
      let bmd = game.make.bitmapData(w, h);
      bmd.rect(0, 0, w, h, '#1F2975')

      let step = 24;
      for (let col = step; col < h; col += step) {
        bmd.line(col, 0, col, h, '#3840F0', 2);
        bmd.line(0, col, w, col, '#3840f0', 2);
      }
      this.game.cache.addBitmapData('menu-bg', bmd);
    }
  }
  createWorld() {
    let game = this.game;
    this.bg = this.add.image(0, 0, game.cache.getBitmapData('menu-bg'));
    this.titleText = game.add.bitmapText(this.targetWidth * 0.5, 100, 'press-start', this.gameTitle.toUpperCase(), this.titleSize);
    this.titleText.anchor.set(0.5);

    let bmd = game.cache.getBitmapData('menu-button')

    let startButton = this.game.add.textButton(this.targetWidth * 0.5, this.targetHeight * 0.5, bmd, 'START', {
      font: 'press-start',
      size: 32,
      useBitmapFont: true
    }, this.startGame, this);
  }
  startGame() {
    this.switchStates(this.playState)
  }

  update() {
    this.bg.alpha = max(random(), 0.75);;
  }
}
