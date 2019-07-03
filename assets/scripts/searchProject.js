$(document).ready(function(){
  $('#search').on('keyup', function() {
    const value = $.trim($(this).val().toLowerCase());

    $('#question').text(
      cox.postposition.pick(value, '로') + ' 세상을 바꿉니다.'
    )

    $('.projects a').each(function() {
      if ($(this).text().toLowerCase().indexOf(value) <= -1)
        $(this).css('display', 'none');
      else
        $(this).css('display', 'unset');
    });
  });
});
