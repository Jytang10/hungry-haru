$(document).ready(initializeApp);

let app;

function initializeApp() {
  // app = new Game($('body'));
  $('.landing-btn').click(closeLanding);
  createProgressIcon();
  createAllCards();
  $('.card-container').on('click', handleCardClick);
  $('.new-game').on('click', resetStats);
  $('.restart-game').on('click', restartGame);
  $('.music-btn').on('click', toggleBGM);
  $('.volume-btn').on('click', muteSounds);
  $('.close').on('click', ()=>{win.pause()});
  $('.about').on('click', aboutModal);
  $(()=>{$('[data-toggle="tooltip"]').tooltip()});
  displayStats();
}

let firstCardClicked = null;
let secondCardClicked = null;
let can_click_card = true;
let matches = 0;
let max_matches = 9;
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
let paused;
let lost = false;
let mute = false;
const bgm = new Audio("./sounds/theme.mp3");
let tada = new Audio("./sounds/ta-da.mp3");
const win = new Audio("./sounds/theme-ska.mp3");
const lose = new Audio("./sounds/good-grief.mp3");
let progress = 0

function closeLanding() {
  $('.cover').hide();
  $('.game-page').removeClass('game-page');
}

function createProgressIcon() {
  let progressIcon = $('<img>').addClass('progress-icon').attr({'src': './img/bigsnoopy.png'}).css({
    'position': 'absolute',
    'right': progress + "%",
    'transition': 'right 1s ease',
    'zIndex': '2'
  });
  $('.player-icon-container').append(progressIcon);
}

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

  let cardGroup = $('<div>').addClass('card-group');
  for(let index = 0; index < 18; index++){
      let cardContainer = $('<div>').addClass('card-container');
      let randomImg = shuffledArray[index];
      let cardFront = $('<div>').addClass('card-front card-face').addClass(randomImg);
      let cardBack = $('<div>').addClass('card-back card-face');
      cardContainer.append(cardFront, cardBack);
      cardGroup.append(cardContainer);
  }
  $('.main-card-container').append(cardGroup);
}

function handleCardClick( event ) {
  if(can_click_card === false || $(event.currentTarget).find('.card-back').hasClass('d-none') || lost === true){
    return;
  }
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
    firstCardClicked.find('.card-back').addClass('d-none');
    return;
  } else {
    secondCardClicked = $(event.currentTarget);
    secondCardClicked.find('.card-back').addClass('d-none');
    attempts++;
  }
  if ($(firstCardClicked).find('.card-front').css('background-image') === $(secondCardClicked).find('.card-front').css('background-image')) {
    progress += 7;
    $('.progress-icon').css({'right': progress + "%"});
    playSuccess();
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
    setTimeout(()=>{
      winSound();
    }, 500);
    games_played++;
    $('#winModal').modal({backdrop: 'static', keyboard: false});
    }
    return;
  } else if(firstCardClicked && secondCardClicked && $(firstCardClicked).find('.card-front').css('background-image') !== $(secondCardClicked).find('.card-front').css('background-image')) {
    displayStats()
    can_click_card = false;
    setTimeout(()=>{
      $(firstCardClicked).find('.card-back').removeClass('d-none');
      $(secondCardClicked).find('.card-back').removeClass('d-none');
      firstCardClicked = null;
      secondCardClicked = null;
      can_click_card = true;
    }, 1000);
  }
}

function calculateAccuracy() {          //use params
  if (attempts) {
    accuracy = ((matches / attempts) * 100)
  } 
  return accuracy;
}

function displayStats() {
  let storeResult = calculateAccuracy().toFixed(0);
  $('.attempts-value').text(attempts + ' / 30');
  $('.accuracy-value').text(storeResult + '%');
  $('.games-played-value').text(games_played);
  if(attempts === 30) {
    lost = true;
    bgm.pause();
    paused = true;
    loseSound();
    games_played++
    $('.card-container').find('.card-back').removeClass('card-back');
    $('#loseModal').modal('show');
  }
}

function removeAllCards() {
  $( ".card-group" ).remove();
}

function resetStats() {
  lost = false;
  win.pause();
  matches = 0;
  accuracy = 0;
  attempts = 0;
  progress = 0;
  firstCardClicked = null;
  secondCardClicked = null;
  displayStats();
  removeAllCards();
  createAllCards();
  $('.card-container').on('click', handleCardClick);
  $('.progress-icon').css({'right': progress + "%",});
  $('#winModal').modal('hide');
}

function restartGame(){ 
  games_played++;
  resetStats();
}

function aboutModal(){ 
  $('#aboutModal').modal('show');
}

function toggleBGM() {
  bgm.loop = true;
  bgm.volume = .7;
  if (paused === false) {
    bgm.pause();
    paused = true;
    $('.music-icon').css({'color':'gray'});
  } else {
    bgm.play();
    paused = false;
    $('.music-icon').css({'color':'#fbb931'});
  }
}

function playSuccess() {
  tada.volume = .3;
  tada.play();
}

function winSound() {
  bgm.pause();
  paused = true;
  win.volume = .4;
  win.play();
}

function loseSound() {
  lose.volume = .4;
  lose.play();
}

function muteSounds () {
  if(mute === false) {
    tada.muted = true;
    mute = true;
    $('.volume-icon').css({'color':'gray'});
  } else {
    tada.muted = false;
    mute = false;
    $('.volume-icon').css({'color':'#fbb931'});
  }
}