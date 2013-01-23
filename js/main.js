function whatTrain() {
  var ref = "2013.01.04";
  // calculate the "current" train from a reference train
  var days = moment(ref)
    .subtract("days", 2)
    // this is a thursday, right after one train ships (wed)
    // and before the next is cut (friday)
    .diff(moment(), 'days');

  return moment(ref).add('days', Math.floor(-days / 14) * 14).format("YYYY.MM.DD");
}

$(function($){
  // determine what train we're talking about
  var train = whatTrain();
  $(".train .name").text(train);
  $(".train .branches").text(moment(train).eod().fromNow());
  $(".train .ships").text(moment(train).add("days", 12).fromNow());
  Calendar.render(".calendar", train);
});