import ArcadeState from 'GameStates/Shared/ArcadeState'
export default class ArcadeGameOverState extends ArcadeState {
  init(props) {
    super.init(props)
    this.winner = props.win;
    this.scoreValue = props.score;
    this.text = this.winner ? 'YOU WIN.' : 'YOU LOSE.';
  }

  createWorld() {

    let game = this.game;
    let w = this.targetWidth;
    let h = this.targetHeight;
    this.gameOverText = game.add.bitmapText(w * 0.5, 100, 'press-start', 'GAME OVER.', 32);
    this.gameOverText.anchor.set(0.5);
    this.statusText = game.add.bitmapText(w * 0.5, 150, 'press-start', this.text, 24);
    this.statusText.anchor.set(0.5);

    this.scoreText = game.add.bitmapText(w * 0.5, 200, 'press-start', 'FINAL SCORE: ' + this.scoreValue, 24);
    this.scoreText.anchor.set(0.5);
    this.scoreText.align = 'center';

    let startButton = this.game.add.textButton(w * 0.5, 300, game.cache.getBitmapData('menu-button'), 'PLAY AGAIN', {
      font: 'press-start',
      size: 32,
      useBitmapFont: true
    }, this.startGame, this);
  }

  startGame() {
    this.switchStates(this.playState);
  }
}
