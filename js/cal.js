var Calendar = {
  // render the calendar given the specified train
  render: function(selector, train) {

    // first update the visual calendar
    var m = moment(train).subtract('days', 12);
    var kids = $(".calendar > div");
    for (var i = 0; i < kids.length; i++) {
      $(kids[i]).text(m.format("MM/DD"));
      if (i > 10 && i < 25) $(kids[i]).addClass("train");
      if (m.sod().diff(moment().sod()) === 0) $(kids[i]).addClass("today");;
      m.add('days', 1);
    }

    // next populate key dates.
    var keyDates = $("div.date");
    for (var i = 0; i < keyDates.length; i++) {
      var x = parseInt($(keyDates[i]).attr("offset"));
      $(keyDates[i]).find(".when").text(moment(train).add('days', x).format("MM/DD"));
    }

    $("div.date").on('mouseover', function() {
      var x = $("div.calendar > div")[12 + parseInt($(this).attr('offset'))];
      // which cell
      $(x).addClass("highlighted");
    });
    $("div.date").on('mouseout', function() {
      var x = $("div.calendar > div")[12 + parseInt($(this).attr('offset'))];
      // which cell
      $(x).removeClass("highlighted");
    });
  }
};
