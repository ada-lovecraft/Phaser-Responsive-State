import ArcadeState from 'GameStates/Shared/ArcadeState';

import arcadeTexture from 'assets/sprites/packs/arcade-atlas.png';
import arcadeAtlas from 'assets/sprites/packs/arcade-atlas.json';

import sfxAtlas from 'assets/audio/packs/sfx.json';

const sfxFiles = [require('assets/audio/packs/sfx.m4a'), require('assets/audio/packs/sfx.ogg'), require('assets/audio/packs/sfx.mp3')];

import musicAtlas from 'assets/audio/packs/music.json';

const musicFiles = [require('assets/audio/packs/music.m4a'), require('assets/audio/packs/music.ogg'), require('assets/audio/packs/music.mp3')];

export default class ArcadePreload extends ArcadeState {
  init(gameName) {
    this.gameName = gameName;
    this.assetsReady = false;
    this.sfxReady = false;
    this.musicReady = false;
    this.fontReady = false;
    let onFontLoadComplete = this.onFontLoadComplete.bind(this);
    window.WebFontConfig = {

      //  'active' means all requested fonts have finished loading
      //  We set a 1 second delay before calling 'createText'.
      //  For some reason if we don't the browser cannot render the text the first time it's created.
      active: onFontLoadComplete,

      //  The Google Fonts we want to load (specify as many as you like in the array)
      google: {
        families: ['Dosis']
      }

    };

    super.init({
      menuState: 'Preload',
      playState: 'Preload',
      gameOverState: 'Preload',
      renderDebug: false
    });

  }


  create() {
    this.game.load.crossOrigin = 'Anonymous';
    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    this.game.load.audiosprite('sfx', sfxFiles, sfxAtlas);
    this.game.load.audiosprite('music', musicFiles, musicAtlas);


    this.game.load.atlasJSONHash(
      'arcade',
      arcadeTexture,
      arcadeAtlas,
    );
    // levels
    this.game.load.json('level1', require('assets/levels/design.json'));

    // fonts
    // - Bitmap fonts
    this.game.load.bitmapFont('dosis', require('assets/fonts/Dosis.png'), require('assets/fonts/Dosis.fnt'));
    this.game.load.start();
    this.game.load.onLoadComplete.addOnce(this.onLoadComplete, this);

  }

  update() {
    if (this.game.load.isLoading) {
      this.game.api.send({
        apiFn: 'progress',
        progress: this.game.load.progress
      });
    }
  }

  onLoadComplete() {
    console.log('onLoad complete')
    this.assetsReady = true;
    this.game.sound.setDecodedCallback(['music', 'sfx'], this.onSoundDecoded, this);
  }
  onFontLoadComplete() {
    console.log('web font loaded. waiting 1 second to proceed')
    this.game.time.events.add(Phaser.Timer.SECOND, () => {
      this.fontReady = true;
      this.checkReady();
    });
  }
  onSoundDecoded() {
    let music = this.game.cache.getSound('music');
    let sfx = this.game.cache.getSound('sfx');
    if (music.decoded) {
      console.log('music decoded');
      this.musicReady = true;
    } else {
      console.error('MUSIC NOT DECODED')
    }
    if (sfx.decoded) {
      console.log('sfx decoded');
      this.sfxReady = true;
    } else {
      console.error('SFX NOT DECODED')
    }
    this.checkReady();
  }
  checkReady() {
    console.log('***** CHECK READY STATUS *****');
    console.log('assets:', this.assetsReady);
    console.log('fonts:', this.fontReady);
    console.log('music:', this.musicReady);
    console.log('sfx:', this.sfxReady);
    if (this.assetsReady && this.musicReady && this.sfxReady && this.fontReady) {

      console.log('***** ALL ASSETS LOCKED AND LOADED *****');

      this.game.api.send({
        apiFn: 'ready'
      });
      this.game.sfx = this.game.add.audioSprite('sfx');
      this.game.music = this.game.add.audioSprite('music');
    }
  }

}
