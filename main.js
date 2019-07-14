$(document).ready(initializeApp);

let app;

let firstCardClicked = null;
let secondCardClicked = null;
let matches = 0;
let max_matches = 9;
let attempts = 0;
let accuracy;
let games_played = 0;

function initializeApp() {
  // app = new Game($('body'));
  $(".card").on('click', handleCardClick)
  displayStats();
}

function handleCardClick( event ) {
  $(event.currentTarget).find('.card-back').addClass('hidden');
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
  } else {
    secondCardClicked = $(event.currentTarget);
    attempts++;
  }
  if ($(firstCardClicked).find('.card-front').css('background-image') === $(secondCardClicked).find('.card-front').css('background-image')) {
    console.log('cards match');
    matches++;
    $(firstCardClicked).addClass('hidden');
    $(secondCardClicked).addClass('hidden');
    firstCardClicked = null;
    secondCardClicked = null;
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
  } else {
    accuracy = 0
  }
  return accuracy;
}

function displayStats() {
  let storeResult = calculateAccuracy().toFixed(0);
  console.log(storeResult)
  $('.attempts-value-text').text(attempts);
  $('.accuracy-value-text').text(storeResult + '%');
  $('.games-played-value-text').text(games_played);
}