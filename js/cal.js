var Calendar = {
  // render the calendar given the specified train
  render: function(selector, train) {
    train = train || '2012.01.11';
    console.log(moment(train).fromNow());
  }
};
