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
  move();
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
  $('.player-img').removeClass('match1-move match2-move match3-move match4-move match5-move match6-move match7-move match8-move match9-move');
  $('#winModal').modal('hide');
}

function restartGame(){ 
  games_played++;
  resetStats();
}

function aboutModal(){ 
  $('#aboutModal').modal('show');
}

function move() {
  let player = $('.player-img');
  switch(matches) {
    case 1:
      player.addClass('match1-move')
      break;
    case 2:
      player.addClass('match2-move')
      break;
    case 3:
      player.addClass('match3-move')
      break;
    case 4:
      player.addClass('match4-move')
      break;
    case 5:
      player.addClass('match5-move')
      break;
    case 6:
      player.addClass('match6-move')
      break;
    case 7:
      player.addClass('match7-move')
      break;
    case 8:
      player.addClass('match8-move')
      break;
    case 9:
      player.addClass('match9-move')
      break;
    default:
  }
}