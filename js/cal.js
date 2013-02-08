var timezone = 'T12:00:00 -0800';

var Calendar = {
  // render the calendar given the specified train
  render: function(selector, train) {
    train = train.replace(/\./g, '-') + timezone;
    // first update the visual calendar
    var m = moment(train).subtract('days', 19);
    var kids = $(".calendar > div");
    kids.removeClass('today');
    var calendarDay = 1;
    for (var i = 0; i < kids.length; i++) {
      $(kids[i]).text(m.format("MM/DD"));
      if (m.sod().diff(moment().sod()) === 0) {
        $(kids[i]).addClass("today").text("today");
      }
      else if (calendarDay < 32) {
        if (calendarDay > 21 && m.day() > 0 && m.day() < 6) {
          $(kids[i]).addClass("qa");
        }
        else if (calendarDay > 14 && m.day() > 0 && m.day() < 6) {
          $(kids[i]).addClass("ddt");
        }
        else if (calendarDay > 7 && m.day() > 0 && m.day() < 6) {
          $(kids[i]).addClass("dev");
        }
      }
      m.add('days', 1);
      calendarDay += 1;
    }
    var m = moment(train).subtract('days', 19);
    var kids = $(".days > div");
    for (var i = 0; i < kids.length; i++) {
      $(kids[i]).text(m.format("ddd"));
      m.add('days', 1);
    }

    // next populate key dates.
    var keyDates = $("div.date");
    for (var i = 0; i < keyDates.length; i++) {
      var x = parseInt($(keyDates[i]).attr("offset"));
      $(keyDates[i]).find(".meta").text(moment(train).add('days', x).format("MM/DD"));
    }

    $("div.date").on('mouseover', function() {
      var x = $("div.calendar > div")[19 + parseInt($(this).attr('offset'))];
      // which cell
      $(x).addClass("highlighted");
    });
    $("div.date").on('mouseout', function() {
      var x = $("div.calendar > div")[19 + parseInt($(this).attr('offset'))];
      // which cell
      $(x).removeClass("highlighted");
    });
  }
};
