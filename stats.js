class Stats {
  constructor() {
    this.matches = 0;
    this.max_matches = 9;
    this.attempts = 0;
    this.accuracy = 0;
    this.games_played = 0;
  }

  displayStats() {
    let storeResult = calculateAccuracy().toFixed(0);
    $('.attempts-value').text(this.attempts + ' / 30');
    $('.accuracy-value').text(storeResult + '%');
    $('.games-played-value').text(this.games_played);
    if(this.attempts === 30) {
      sounds.lost = true;
      bgm.pause();
      paused = true;
      $('.music-icon').css({'color':'gray'});
      loseSound();
      this.games_played++
      $('.card-container').find('.card-back').removeClass('card-back');
      $('#loseModal').modal('show');
    }
  }

  calculateAccuracy() {          //use params
    if (this.attempts) {
      this.accuracy = ((this.matches / this.attempts) * 100)
    } 
    return this.accuracy;
  }
  
  resetStats() {
    lost = false;
    win.pause();
    this.matches = 0;
    this.accuracy = 0;
    this.attempts = 0;
    progress = 0;
    game.firstCardClicked = null;
    game.secondCardClicked = null;
    this.displayStats();
    game.removeAllCards();
    game.createAllCards();
    $('.card-container').on('click', game.handleCardClick);
    $('.progress-icon').css({'bottom': progress + "%",});
    $('#winModal').modal('hide');
  }
  
  restartGame() { 
    this.games_played++;
    this.resetStats();
  }
  
  aboutModal() { 
    $('#aboutModal').modal('show');
  }
  
}