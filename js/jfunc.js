$(document).ready(function(){

  console.log("jfunc.js file is being read");

  $('#content').on('click','.expandButton',function(){
    $(this).parent().find('.previewBoxLeft').toggleClass('hidden');
  });

});
