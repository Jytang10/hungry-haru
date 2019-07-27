let game, sounds, stats, progress;
$(document).ready(initializeApp);

function initializeApp() {
  game = new Game();
  sounds = new Sounds();
  stats = new Stats();
  progress = new Progress();
  $('.landing-btn').click(closeLanding);
  
  progress.createProgressIcon();
  game.createAllCards();
  $('.card-container').on('click', game.handleCardClick);
  $('.new-game').on('click', stats.resetStats);
  $('.restart-game').on('click', stats.restartGame);
  $('.music-btn').on('click', sounds.toggleBGM);
  $('.volume-btn').on('click', sounds.muteSounds);
  $('.close').on('click', ()=>{sounds.win.pause()});
  $('.about').on('click', stats.aboutModal);
  $(()=>{$('[data-toggle="tooltip"]').tooltip()});
  stats.displayStats();
}

function closeLanding() {
  $('.cover').hide();
  $('.game-page').removeClass('d-none');
}