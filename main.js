$(document).ready(initializeApp);

let app;

function initializeApp() {
  // app = new Game($('body'));
  createAllCards();
  $('.card-container').on('click', handleCardClick);
  $('.new-game').on('click', resetStats);
  $('.restart-game').on('click', restartGame);
  $('.about').on('click', aboutModal);
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
      let cardFront = $('<div>').addClass('card-front card-face').addClass(randomImg);
      let cardBack = $('<div>').addClass('card-back card-face');
      cardContainer.append(cardFront, cardBack);
      $('.main-card-container').append(cardContainer);
  }
}

function handleCardClick( event ) {
  if(can_click_card === false || $(event.currentTarget).find('.card-back').hasClass('hidden')){
    return;
  }
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
    firstCardClicked.find('.card-back').addClass('hidden');
    return;
  } else {
    secondCardClicked = $(event.currentTarget);
    secondCardClicked.find('.card-back').addClass('hidden');
    attempts++;
  }
  if ($(firstCardClicked).find('.card-front').css('background-image') === $(secondCardClicked).find('.card-front').css('background-image')) {
    can_click_card = false
    matches++;
    setTimeout(()=>{
      $(firstCardClicked).addClass('opacity-zero no-cursor');
      $(secondCardClicked).addClass('opacity-zero no-cursor');
      firstCardClicked = null;
      secondCardClicked = null;
      can_click_card = true;
    }, 500);
    displayStats();
    if(matches === max_matches) {
    games_played++;
    $('#winModal').modal('show');
    }
    return;
  } else if(firstCardClicked && secondCardClicked && $(firstCardClicked).find('.card-front').css('background-image') !== $(secondCardClicked).find('.card-front').css('background-image')) {
    displayStats()
    can_click_card = false;
    setTimeout(()=>{
      $(firstCardClicked).find('.card-back').removeClass('hidden');
      $(secondCardClicked).find('.card-back').removeClass('hidden');
      firstCardClicked = null;
      secondCardClicked = null;
      can_click_card = true;
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

function aboutModal(){ 
  $('#aboutModal').modal('show');
}