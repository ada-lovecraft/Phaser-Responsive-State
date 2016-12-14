
import ArcadeGameMenuState from 'GameStates/Shared/ArcadeGameMenu'

let buttonStyle = {
  font: '64px Dosis',
  fontWeight: 900,
  fill: '#FFFFFF',
  align: 'center'
};
let titleStyle = {
  font: '64px Dosis',
  fontWeight: 900,
  fill: '#FFFFFF',
  align: 'center'
};



export default class ArcadeMenu extends ArcadeGameMenuState {
  init(props = {}) {
    super.init(props);
    let buttonbmd;
    let game = this.game;


  }
  createWorld() {
    let game = this.game;
    this.bg = this.add.image(0, 0, game.cache.getBitmapData('menu-bg'));
    let buttonbmd = game.cache.getBitmapData('menu-button');
    let pachinkoButton = this.add.textButton(this.targetWidth * 0.5, 200, buttonbmd, 'TWIST CANNON', {
      font: 'press-start',
      size: 36,
      useBitmapFont: true
    }, this.startPachinko, this);


    let invasionButton = this.add.textButton(this.targetWidth * 0.5, 320, buttonbmd, 'CHIP INVADERS', {
      font: 'press-start',
      size: 36,
      useBitmapFont: true
    }, this.startInvasion, this)


    let sliceButton = this.add.textButton(this.targetWidth * 0.5, 440, buttonbmd, 'SNACK KWON-DO', {
      font: 'press-start',
      size: 36,
      useBitmapFont: true
    }, this.startSlice, this)


    let bricksButton = game.add.textButton(this.targetWidth * 0.5, 560, buttonbmd, 'DINAMITA DETONATOR', {
      font: 'press-start',
      size: 30,
      useBitmapFont: true
    }, this.startBricks, this)


  }
  startPachinko() {
    this.game.state.start('Pachinko');
  }
  startInvasion() {
    this.game.state.start('Invasion');
  }
  startSlice() {
    this.game.state.start('Slice');
  }
  startBricks() {
    this.game.state.start('Bricks');
  }
}
