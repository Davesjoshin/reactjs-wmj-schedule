$(document).ready(function(){
  console.log("This part is working");
  $('#content').on('click','.expandButton',function(){
    $(this).parent().find('.previewBoxLeft').removeClass('hidden');
  });
});
