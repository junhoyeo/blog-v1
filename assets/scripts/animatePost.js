$('.post__title').each(function(){
  $(this).html($(this).text().replace(/([^.,\n,\r,\u2028,\u2029,\u0085]|\w)/g, "<span class='letter'>$&</span>"));
});

anime.timeline()
  .add({
    targets: '.post__title .letter',
    scale: [0, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: 'easeInOutQuad',
    duration: 950,
    delay: function(el, i) {
      return 70 * i;
    }
  })
