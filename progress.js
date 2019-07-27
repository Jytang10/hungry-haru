class Progress {
  constructor() {
    this.progress = 0
  }

  createProgressIcon() {
    let progressIcon = $('<img>').addClass('progress-icon').attr({'src': './img/bigsnoopy.png'}).css({
      'position': 'absolute',
      'bottom': this.progress + "%",
      'right': '20%',
      'transition': 'bottom 1s ease',
      'zIndex': '2'
    });
    $('.game-progress').append(progressIcon);
  }

}