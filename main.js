$(document).ready(initializeApp);

let app;

let firstCardClicked = null;
let secondCardClicked = null;
let matches = null;

function initializeApp() {
    // app = new Game($('body'));
    $(".card").on('click', handleCardClick)
}

function handleCardClick( event ) {
  $(event.currentTarget).find('.card-back').addClass('hidden');
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
  } else {
    secondCardClicked = $(event.currentTarget);
  }

  if ($(firstCardClicked).find('.card-front').css('background-image') === $(secondCardClicked).find('.card-front').css('background-image')) {
    console.log('cards match');
    matches++;
    $(firstCardClicked).addClass('hidden');
    $(secondCardClicked).addClass('hidden');
  } else if(firstCardClicked && secondCardClicked && $(firstCardClicked).find('.card-front').css('background-image') !== $(secondCardClicked).find('.card-front').css('background-image')) {
    setTimeout(()=>{
      $(firstCardClicked).find('.card-back').removeClass('hidden');
      $(secondCardClicked).find('.card-back').removeClass('hidden');
    }, 1000);
  }

}