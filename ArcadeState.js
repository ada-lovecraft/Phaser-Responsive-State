import { camelCase, has, sample, map } from 'lodash';
import ResponsiveState from 'GameStates/Shared/ResponsiveState';
import Logger from 'utils/Logger';
const logger = new Logger('ArcadeState', '#333', '#FFF');
const log = logger.log.bind(logger);
const nfo = logger.info.bind(logger);
const dbg = logger.debug.bind(logger);
const err = logger.error.bind(logger);
const warn = logger.warn.bind(logger);


export default class ArcadeState extends ResponsiveState {
  init(props = {}) {
    this.fx = {};
    super.init({
      alignMiddle: false,
    });
  }
  // shared lifecycle
  create() {
    this.createWorld();
    this.resize(this.game.width, this.game.height);

  }
  resize(width, height) {
    super.resize(width, height);
  }

  createWorld() {
    warn('override createWorld() in the inherited state to setup the game world;');
  }

  launch() {
    warn('override launch() to kick off the game');
  }

  // shared helpers
  switchStates(stateName, props = {}) {
    this.game.state.start(stateName, true, false, props)
  }

  addFX(key, name = camelCase(key), allowMultiple = true, volume = 1.0) {
    if (key instanceof Array) {

      this.fx[name] = map(key, k => {
        return {
          marker: k,
          volume: volume
        }
      });
    /*
      let s = this.game.add.audio(k);
      s.allowMultiple = allowMultiple;
      s.volume = volume;
      return s;
    });*/
    } else {
      this.fx[name] = {
        marker: key,
        volume: volume
      };
    }

  }

  playFX(name) {
    let fx = this.fx[name];
    if (fx) {
      if (fx instanceof Array) {

        log('fx array:', fx);
        let sfx = sample(fx);
        this.game.sfx.play(sfx.marker, sfx.volume)
      } else {
        this.game.sfx.play(fx.marker, fx.volume);
      }

    } else {
      warn(`${name} effect does not exist`)
    }

  }



}
