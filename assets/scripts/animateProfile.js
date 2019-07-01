$('.profile__name .letters').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

anime.timeline()
  .add({
    targets: '.profile__name .letter',
    scale: [0, 1],
    duration: 2000,
    elasticity: 500,
  })
