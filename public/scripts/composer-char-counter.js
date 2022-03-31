$(document).ready(function() {
  let maxLength = 140;
  $("textarea").on("input", function() { 
    let counter = $(this).closest(".new-tweet").find(".counter");
    let length = $(this).val().length;
    let charRemaining = maxLength-length;
    counter.text(charRemaining);
    if (charRemaining < 0) {
      counter.addClass("negativeChar");
      //$("#ecessive-tweet").slideUp("fast");
    } else {
        counter.removeClass("negativeChar");
        //$("#empty-tweet").slideUp("fast");
    }
  });
});