$(document).ready(initializeApp);

let app;

function initializeApp() {
  // app = new Game($('body'));
  createAllCards();
  $('.card-container').on('click', handleCardClick);
  $('.new-game').on('click', resetStats);
  $('.restart-game').on('click', restartGame);
  displayStats();
}

let firstCardClicked = null;
let secondCardClicked = null;
let can_click_card = true;
let matches = 0;
let max_matches = 9;
let max_attempts = 35;
let attempts = 0;
let accuracy = 0;
let games_played = 0;
let imageArray = [
  'snoopy',
  'woodstock', 
  'charlie',
  'linus',
  'lucy',
  'pepper',
  'pig',
  'sally',
  'schroeder'
];

function createAllCards() {
  let doubleImages = imageArray.concat(imageArray);

  function shuffle(array){
      let currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }
      return array;
  }
  let shuffledArray = shuffle(doubleImages);

  for(let index = 0; index < 18; index++){
      let cardContainer = $('<div>').addClass('card-container');
      let randomImg = shuffledArray[index];
      let cardFront = $('<div>').addClass('card-front').addClass(randomImg);
      let cardBack = $('<div>').addClass('card-back');
      cardContainer.append(cardFront, cardBack);
      $('.main-card-container').append(cardContainer);
  }
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

function removeAllCards() {
  $( ".card-container" ).remove();
}

function resetStats() {
  matches = 0;
  accuracy = 0;
  attempts = 0;
  firstCardClicked = null;
  secondCardClicked = null;
  displayStats();
  removeAllCards();
  createAllCards();
  $('.card-container').on('click', handleCardClick);
  $('#winModal').modal('hide');
}

function restartGame(){ 
  games_played++;
  resetStats();
}