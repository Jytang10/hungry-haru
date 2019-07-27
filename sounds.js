class Sounds {
  constructor() {
    this.paused;
    this.mute = false;
    this.bgm = new Audio("./sounds/theme.mp3");
    this.jingle = new Audio("./sounds/jingle.wav");
    this.win = new Audio("./sounds/theme-ska.mp3");
    this.lose = new Audio("./sounds/good-grief.mp3");
    this.toggleBGM = this.toggleBGM.bind(this);
    this.playSuccess = this.playSuccess.bind(this);
    this.winSound = this.winSound.bind(this);
    this.loseSound = this.loseSound.bind(this);
    this.muteSounds = this.muteSounds.bind(this);
  }

  toggleBGM() {
    this.bgm.loop = true;
    this.bgm.volume = .7;
    if (this.paused === false) {
      this.bgm.pause();
      this.paused = true;
      $('.music-icon').css({'color':'gray'});
    } else {
      this.bgm.play();
      this.paused = false;
      $('.music-icon').css({'color':'#fbb931'});
    }
  }
  
  playSuccess() {
    this.jingle.volume = .3;
    this.jingle.play();
  }
  
  winSound() {
    this.bgm.pause();
    $('.music-icon').css({'color':'gray'});
    this.paused = true;
    this.win.volume = .4;
    this.win.play();
  }
  
  loseSound() {
    this.lose.volume = .4;
    this.lose.play();
  }
  
  muteSounds () {
    if(this.mute === false) {
      this.jingle.muted = true;
      this.mute = true;
      $('.volume-icon').css({'color':'gray'});
    } else {
      this.jingle.muted = false;
      this.mute = false;
      $('.volume-icon').css({'color':'#fbb931'});
    }
  }
  
}