import ArcadePhysicsState from 'GameStates/Shared/ArcadePhysicsState';
import ArcadeControllerPlugin from 'Plugins/ArcadeController'
import Logger from 'utils/Logger';
import { findKey } from 'lodash';
const logger = new Logger('WaitState', '#333', '#FFF');
const nfo = logger.info.bind(logger);




export default class WaitState extends ArcadePhysicsState {
  init(props) {
    super.init(props);
    nfo('Wait State Initialized: calling api method on create:', props.apiFn);
    this.apiParams = props;

  }
  create() {
    super.create();
    nfo('wait state created. calling api method:', this.apiParams.apiFn);
    this.game.api.send(this.apiParams);
  }

}
