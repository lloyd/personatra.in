function whatTrain() {
  return "2013.01.18";
}

$(function($){
  // determine what train we're talking about
  var train = whatTrain();
  $(".train .name").text(train);
  $(".train .branches").text(moment(train).fromNow());
  $(".train .ships").text(moment(train).add("days", 12).fromNow());
  Calendar.render(".calendar", train);
});
