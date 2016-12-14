import { defaults } from 'lodash';
import Logger from 'utils/Logger';
const logger = new Logger('ResponsiveState', '#333', '#FFF');
const log = logger.log.bind(logger);
const nfo = logger.info.bind(logger);
const dbg = logger.debug.bind(logger);
const err = logger.error.bind(logger);
const warn = logger.warn.bind(logger);


const TARGET_WIDTH = 640;
const TARGET_HEIGHT = 744;
const TARGET_RATIO = TARGET_WIDTH / TARGET_HEIGHT;

const MAX_HEIGHT = 700;
const MAX_WIDTH = MAX_HEIGHT * TARGET_RATIO;
const MAX_SCALEFACTOR = MAX_WIDTH / TARGET_WIDTH;



//composables
const {min} = Math;
const f2 = (x) => x.toFixed(2);

let resizeTimeout = null;

export default class ResponsiveState extends Phaser.State {
  init(props) {
    defaults(this, props, ResponsiveState.DEFAULTS);
    this.scaleFactor = 1;
    this.targetWidth = TARGET_WIDTH;
    this.targetHeight = TARGET_HEIGHT;
    this.targetRatio = TARGET_RATIO;
  }
  get scaleWidth() {
    return this.targetWidth * this.scaleFactor;
  }
  get scaleHeight() {
    return this.targetHeight * this.scaleFactor;
  }
  resize(width, height) {

    nfo('resize:', width, height);
    let game = this.game;
    this.game.camera.bounds = null;

    let wscale = width / TARGET_WIDTH;
    let hscale = height / TARGET_HEIGHT;
    let scaleFactor;
    if (hscale <= wscale) {
      scaleFactor = hscale;
    } else {
      scaleFactor = wscale;
    }

    if (scaleFactor > MAX_SCALEFACTOR) {
      scaleFactor = MAX_SCALEFACTOR;
    }
    let w = TARGET_WIDTH * scaleFactor;
    let h = TARGET_HEIGHT * scaleFactor;


    this.relativeScaleFactor = 1 + (scaleFactor - this.scaleFactor);

    this.scaleFactor = scaleFactor;
    this.game.world.scale.set(this.scaleFactor);
    this.game.world.bounds.width = w;
    this.game.world.bounds.height = h;

    if (this.alignCenter) {
      this.game.world.bounds.centerX = width * 0.5;
      this.game.camera.x = (-width * 0.5) + (w * 0.5);
    } else {
      this.game.world.bounds.x = 0;
      this.game.camera.x = 0
    }
    if (this.alignMiddle) {
      this.game.world.bounds.centerY = height * 0.5;
      this.game.camera.y = (-height * 0.5) + (h * 0.5);
    } else {
      this.game.world.bounds.y = 0;
      this.game.camera.y = 0;
    }

  }
}

ResponsiveState.DEFAULTS = {
  alignCenter: true,
  alignMiddle: true
}

ResponsiveState.TARGETS = {
  WIDTH: TARGET_WIDTH,
  HEIGHT: TARGET_HEIGHT
}
