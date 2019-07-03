function updatePostposition(text){
  $('#question').text(
    cox.postposition.pick(text, '로') + ' 세상을 바꿉니다.'
  );
}

$(document).ready(function(){
  $('#search').on('keyup', function() {
    const value = $.trim($(this).val().toLowerCase());
    updatePostposition(value);

    $('.projects a').each(function() {
      if ($(this).text().toLowerCase().indexOf(value) <= -1)
        $(this).css('display', 'none');
      else
        $(this).css('display', 'unset');
    });

    if ($('.projects').length === 1) {
      $('#contact').css('display', 'flex');
    }
  });

  $('#contact').css('display', 'none');
});

$('#search').placeholderTypewriter({
  text: [
    '정보기술',
    '블록체인',
    '프론트엔드',
    'IoT'
  ]
})
