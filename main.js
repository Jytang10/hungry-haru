$(document).ready(initializeApp);

let app;

function initializeApp() {
    // app = new Game($('body'));
    $(".card").on('click', handleCardClick)
}

function handleCardClick( event ) {
  $(event.currentTarget).find('.card-back').addClass('hidden');
}