$(document).ready(initializeApp);

let app;

let firstCardClicked = null;
let secondCardClicked = null;
let matches = 0;
let max_matches = 9;
let attempts = 0;
let accuracy = 0;
let games_played = 0;
// let card = document.querySelector('.card');

function initializeApp() {
  // app = new Game($('body'));
  $('.card-container').on('click', handleCardClick);
  $('.new-game').on('click', resetStats);
  $('.restart-game').on('click', restartGame);
  displayStats();
  // flipCard();
}

// function flipCard() {
//   let card = document.querySelector('.card');
//   card.addEventListener('click', ()=> {
//   card.classList.toggle('is-flipped');
//   });
// }

function handleCardClick( event ) {
  $(event.currentTarget).find('.card-back').addClass('hidden');
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
  } else {
    secondCardClicked = $(event.currentTarget);
    attempts++;
  }
  if ($(firstCardClicked).find('.card-front').css('background-image') === $(secondCardClicked).find('.card-front').css('background-image')) {
    matches++;
    setTimeout(()=>{
      $(firstCardClicked).addClass('opacity-zero');
      $(secondCardClicked).addClass('opacity-zero');
      firstCardClicked = null;
      secondCardClicked = null;
    }, 500);
    displayStats();
    if(matches === max_matches) {
    games_played++;
    console.log(games_played)
    $('#winModal').modal('show');
    }
  } else if(firstCardClicked && secondCardClicked && $(firstCardClicked).find('.card-front').css('background-image') !== $(secondCardClicked).find('.card-front').css('background-image')) {
    displayStats()
    setTimeout(()=>{
      $(firstCardClicked).find('.card-back').removeClass('hidden');
      $(secondCardClicked).find('.card-back').removeClass('hidden');
      firstCardClicked = null;
      secondCardClicked = null;
    }, 1000);
  }
}

function calculateAccuracy() {
  if (attempts) {
    accuracy = ((matches / attempts) * 100)
  } 
  return accuracy;
}

function displayStats() {
  let storeResult = calculateAccuracy().toFixed(0);
  $('.attempts-value-text').text(attempts);
  $('.accuracy-value-text').text(storeResult + '%');
  $('.games-played-value-text').text(games_played);
}

function resetStats() {
  matches = 0;
  accuracy = 0;
  attempts = 0;
  firstCardClicked = null;
  secondCardClicked = null;
  displayStats();
  $('.card-container').removeClass('opacity-zero');
  $('.card-back').removeClass('hidden');
  $('#winModal').modal('hide');
}

function restartGame(){ 
  games_played++;
  resetStats();
}