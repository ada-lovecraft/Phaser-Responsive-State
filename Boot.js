import monkeyPatch from 'utils/PhaserMonkeyPatch';

import ResponsiveState from 'GameStates/Shared/ResponsiveState';
import ArcadePhysicsState from 'GameStates/Shared/ArcadePhysicsState';

import CameraShakePlugin from 'Plugins/CameraShake';
import APIBridgePlugin from 'Plugins/APIBridge';
import TextButton from 'GameObjects/Shared/TextButton';



// extend phaser with custom classes



export default class ArcadeBoot extends Phaser.State {
  constructor(...args) {
    super(...args);
    if (!Phaser.ResponsiveState) {
      monkeyPatch(ResponsiveState)
      monkeyPatch(ArcadePhysicsState);
      monkeyPatch(TextButton, TextButton.factory);
    }

  }
  init(gameName, client) {
    this.gameName = gameName;
    this.game.sound.volume = 0.25;

    this.game.stage.backgroundColor = '#000000';
    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.game.juice = {
      cameraShake: this.game.add.plugin(new CameraShakePlugin(this.game))
    }
    let api = this.game.add.plugin(new APIBridgePlugin(this.game, client));
    api.gameName = gameName;
    this.game.api = api;
    //this.game.juice.cameraShake.active = false;

  }
  create() {
    this.game.state.start('Preload');
  }
}
