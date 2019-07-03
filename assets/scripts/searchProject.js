$(document).ready(function(){
  $('#search').on('keyup', function() {
    const value = $.trim($(this).val().toLowerCase());
    $('.projects a').each(function() {
      if ($(this).text().toLowerCase().indexOf(value) <= -1)
        $(this).css('display', 'none');
      else
        $(this).css('display', 'unset');
    });
  });
});
