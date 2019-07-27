class Game {
  constructor() {
    this.firstCardClicked = null;
    this.secondCardClicked = null;
    this.can_click_card = true;
  }

  createAllCards() {
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

  handleCardClick( event ) {
    if(this.can_click_card === false || $(event.currentTarget).find('.card-back').hasClass('d-none') || lost === true){
      return;
    }
    if (this.firstCardClicked === null) {
      this.firstCardClicked = $(event.currentTarget);
      this.firstCardClicked.find('.card-back').addClass('d-none');
      return;
    } else {
      this.secondCardClicked = $(event.currentTarget);
      this.secondCardClicked.find('.card-back').addClass('d-none');
      stats.attempts++;
    }
    if ($(this.firstCardClicked).find('.card-front').css('background-image') === $(this.secondCardClicked).find('.card-front').css('background-image')) {
      progress += 7;
      $('.progress-icon').css({'bottom': progress + "%"});
      playSuccess();
      this.can_click_card = false
      stats.matches++;
      setTimeout(()=>{
        $(this.firstCardClicked).addClass('opacity-zero no-cursor');
        $(this.secondCardClicked).addClass('opacity-zero no-cursor');
        this.firstCardClicked = null;
        this.secondCardClicked = null;
        this.can_click_card = true;
      }, 500);
      stats.displayStats();
      if(stats.matches === stats.max_matches) {
      setTimeout(()=>{
        winSound();
      }, 500);
      stats.games_played++;
      $('#winModal').modal({backdrop: 'static', keyboard: false});
      }
      return;
    } else if(this.firstCardClicked && this.secondCardClicked && $(this.firstCardClicked).find('.card-front').css('background-image') !== $(this.secondCardClicked).find('.card-front').css('background-image')) {
      displayStats()
      this.can_click_card = false;
      setTimeout(()=>{
        $(this.firstCardClicked).find('.card-back').removeClass('d-none');
        $(this.secondCardClicked).find('.card-back').removeClass('d-none');
        this.firstCardClicked = null;
        this.secondCardClicked = null;
        this.can_click_card = true;
      }, 1000);
    }
  }

  removeAllCards() {
    $( ".card-group" ).remove();
  }

}