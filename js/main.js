function whatTrain(fromWhen) {
  fromWhen = moment(typeof fromWhen === 'string' ? fromWhen.replace(/\./g, '/') : fromWhen);
  if (!fromWhen || !fromWhen.isValid()) fromWhen = moment(); // now

  var ref = "2013/01/04";
  // calculate the "current" train from a reference train

  var days = moment(ref)
    .subtract("days", 2)
    // this is a thursday, right after one train ships (wed)
    // and before the next is cut (friday)
    .diff(moment(fromWhen), 'days');
  return moment(ref).add('days', Math.floor(-days / 14) * 14).format("YYYY.MM.DD");
}

$(function($){
  // determine what train we're talking about
  function setTrain(train) {
    var m = moment(train.replace(/\./g, '-') + timezone);
    $(".train .name .name").text(train);
    $(".train .branches").text(m.eod().fromNow());
    $(".train .ships").text(m.add("days", 12).fromNow());
    Calendar.render(".calendar", train);
  }

  // extract the current train from the page hash or use the current train
  // if hash isn't available.
  function trainFromHash() {
    return whatTrain(document.location.hash.substr(1));
  }

  function fixHash() {
    if (trainFromHash() != document.location.hash.substr(1)) {
      document.location.hash = trainFromHash();
      return true;
    }
    return false;
  }

  if (!fixHash()) setTrain(trainFromHash());

  $(window).on('hashchange', function() {
    if (!fixHash()) setTrain(trainFromHash());
  });

  // forward or backward a train
  $(".train .name .right").on('click', function() {
    document.location.hash = moment(trainFromHash().replace(/\./g, "/"))
      .add('days', 14).format("YYYY.MM.DD");
  });
  $(".train .name .left").on('click', function() {
    document.location.hash = moment(trainFromHash().replace(/\./g, "/"))
      .subtract('days', 14).format("YYYY.MM.DD");
  });
});
