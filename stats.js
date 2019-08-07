class Stats {
  constructor() {
    this.matches = 0;
    this.max_matches = 9;
    this.attempts = 0;
    this.errors = 0;
    this.accuracy = 0;
    this.games_played = 0;
    this.resetStats = this.resetStats.bind(this);
  }

  displayStats() {
    let storeResult = this.calculateAccuracy(this.matches, this.attempts).toFixed(0);
    $('.errors-value').text(this.errors + ' / 20');
    $('.accuracy-value').text(storeResult + '%');
    $('.games-played-value').text(this.games_played);
    if(this.errors === 20) {
      game.lost = true;
      sounds.bgm.pause();
      sounds.paused = true;
      $('.music-icon').css({'color':'gray'});
      sounds.loseSound();
      this.games_played++
      $('.card-container').find('.card-back').removeClass('card-back');
      $('#loseModal').modal('show');
    }
  }

  calculateAccuracy(matches, attempts) {
    if (this.attempts) {
      this.accuracy = (( matches / attempts) * 100)
    } 
    return this.accuracy;
  }
  
  resetStats() {
    game.lost = false;
    sounds.win.pause();
    this.matches = 0;
    this.accuracy = 0;
    this.attempts = 0;
    this.errors = 0;
    progress.progress = 0;
    game.firstCardClicked = null;
    game.secondCardClicked = null;
    this.displayStats();
    game.removeAllCards();
    game.createAllCards();
    $('.card-container').on('click', game.handleCardClick);
    $('.progress-icon').css({'bottom': progress.progress + "%",});
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