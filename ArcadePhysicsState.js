import ArcadeState from 'GameStates/Shared/ArcadeState';
import Wall from 'GameObjects/Shared/Wall';
import PhysicsSprite from 'GameObjects/Shared/PhysicsSprite'
import ArcadeEmitter from 'GameObjects/Shared/ArcadeEmitter';


import { get, set, forOwn, defaultsDeep } from 'lodash';

import Logger from 'utils/Logger';
const logger = new Logger('ArcadePhysicsState', '#333', '#FFF');
const nfo = logger.info.bind(logger);


export default class ArcadePhysicsState extends ArcadeState {
  init(props = {}) {
    this.walls = {};
    this.renderDebug = props.renderDebug;
    super.init(props);

  }
  create() {
    this.initPhysics();
    this.configurePhysics();
    this.createWalls();
    this.createWorld();
    this.resize(this.game.width, this.game.height);
    this.launch();
  }

  render() {
    if (this.renderDebug === true) {
      let game = this.game;
      game.debug.box2dWorld();
      game.physics.box2d.debugDraw.shapes = true;
      game.physics.box2d.debugDraw.pairs = true;
      game.physics.box2d.debugDraw.centerOfMass = true;
    }
  }
  resize(w, h) {
    super.resize(w, h);
  }
  get wallBodies() {
    return {
      top: this.topWall.body,
      bottom: this.bottomWall.body,
      left: this.leftWall.body,
      right: this.rightWall.body
    }
  }
  // accessors
  get bottomWall() {
    return this.walls.bottom;
  }
  get topBorderWall() {
    return this.walls.borderTop;
  }
  get topWall() {
    return this.walls.top;
  }
  get leftWall() {
    return this.walls.left;
  }
  get rightWall() {
    return this.walls.right;
  }
  get volume() {
    return this.targetWidth * this.targetHeight;
  }

  initPhysics() {
    if (!this.game.physics.box2d) {
      this.game.physics.startSystem(Phaser.Physics.BOX2D)
    }
  }
  configurePhysics() {
    nfo('over ride configurePhysics for ArcadePhysicsState inherited classes');
  }

  createWalls() {

    let game = this.game;
    this.walls.borderTop = game.add.existing(new Wall(this.game, this.targetWidth * 0.5, 1, Wall.WALL_TYPES.HORIZONTAL));
    this.walls.top = game.add.existing(new Wall(this.game, this.targetWidth * 0.5, 94, Wall.WALL_TYPES.HORIZONTAL));
    this.walls.bottom = game.add.existing(new Wall(this.game, this.targetWidth * 0.5, this.targetHeight - 1, Wall.WALL_TYPES.HORIZONTAL));
    this.walls.left = game.add.existing(new Wall(this.game, -1, this.targetHeight * 0.5, Wall.WALL_TYPES.VERTICAL));
    this.walls.right = game.add.existing(new Wall(this.game, this.targetWidth + 1, this.targetHeight * 0.5, Wall.WALL_TYPES.VERTICAL));

    forOwn(this.walls, (wall, name) => {
      wall.name = name;
    });
  }
}
