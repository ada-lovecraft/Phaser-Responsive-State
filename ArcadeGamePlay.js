import ArcadePhysicsState from 'GameStates/Shared/ArcadePhysicsState';
import ReactiveHUD from 'GameObjects/Shared/ReactiveHUD';


import Logger from 'utils/Logger';
const logger = new Logger('ArcadeGamePlay', '#333', '#FFF');
const log = logger.log.bind(logger);
const nfo = logger.info.bind(logger);
const dbg = logger.debug.bind(logger);
const err = logger.error.bind(logger);
const warn = logger.warn.bind(logger);



export default class ArcadeGamePlayState extends ArcadePhysicsState {
  get isGameOver() {
    return this._gameover;
  }
  init(props = {}) {
    super.init(props);
    this.scoreInit = 0;
    this.healthInit = 3;
    this.scoreThreshold = 0;
    this._gameover = false;
    this.music = null;
    this.playfieldMask = null;
    this.musicKey = null;
  }

  //lifecycle methods
  create() {
    this.initPhysics();
    this.configurePhysics();
    //this.createBackground();
    this.createHud();
    this.createPlayfieldMask();
    this.createWalls();
    this.createWorld();
    this.world.bringToTop(this.hud);
    //this.createTechFrame();

    this.resize(this.game.width, this.game.height);
    this.launch();
    this.startMusic();
  }



  resize(width, height) {
    super.resize(width, height);
    log('updating hud:', this.game.world.bounds.x, this.game.world.bounds.left);
    this.hud.cameraOffset.set(this.game.world.bounds.x, this.game.world.bounds.y);
    this.game.juice.cameraShake.savePosition();
  }

  get multiplier() {
    return this.hud.multiplier;
  }
  set multiplier(val) {
    this.hud.multiplier = val;
  }

  createPlayfieldMask() {
    let game = this.game;
    let mask = game.add.graphics(0, 0);
    mask.beginFill(0xFFFFFF);
    mask.drawRect(0, this.hud.line.y + 1, this.targetWidth, this.targetHeight - this.hud.line.y);
    mask.alive = false;
    this.playfieldMask = mask;

  }

  createTechFrame() {
    let frame = this.game.add.image(0, 0, 'arcade', 'tech');
    frame.anchor.set(0.5, 0.5);
    frame.blendMode = PIXI.blendModes.COLOR_BURN;
    frame.fixedToCamera = true;
    this.techFrame = frame;
  }

  createHud() {
    let hud = this.game.add.existing(new ReactiveHUD(this.game, this.scoreInit, this.healthInit, this.scoreThreshold));
    hud.fixedToCamera = true;
    this.hud = hud;
  }


  startMusic() {
    if (this.musicKey) {
      log('starting music')
      this.game.music.play(this.musicKey, 0.5);
    }

  }

  endMusic() {
    this.game.music.stop();
  }


  score(target, pop = false) {
    this.hud.updateScore(target, pop);
  }

  // shared game methods
  calculateFinalScore() {
    warn('Override the (calculateFinalScore) method in your inherited playstate!')
    return this.hud.score;
  }

  clearMultiplier() {
    this.hud.clearMultiplier();
  }

  win() {
    this._gameover = true;
    this.gameOver({
      win: true,
      score: this.calculateFinalScore()
    })
  }
  lose() {
    this._gameover = true;
    this.gameOver({
      win: false,
      score: this.hud.score
    });
  }
  gameOver(props) {
    props.apiFn = 'complete';
    this.endMusic();
    this.switchStates('Wait', props);
  }

  render() {

    super.render();
  /*
  if (this.game.music) {
    //debugger;
    let music = this.game.music.sounds[this.musicKey];
    let context = window.PhaserGlobal && window.PhaserGlobal.audioContext ? window.PhaserGlobal.audioContext : this.game.sound.context;
    this.game.debug.text('music:', 32, 128, '#ffffff')
    this.game.debug.text(`	playing: ${music.isPlaying} vol: ${music.volume}`, 32, 160, '#fff');
    this.game.debug.text(`	mute: ${music.mute}
pos: ${music.currentTime}`, 32, 192, '#ffffff')
    this.game.debug.text(`	sampleRate: ${context.sampleRate}`, 32, 224, '#ffffff')
    this.game.debug.text(`	global: ${context == window.PhaserGlobal.audioContext}`, 32, 256)
  }*/
  }



}

ArcadeGamePlayState.HUD_BOTTOM = ReactiveHUD.HUD_LINE_Y
