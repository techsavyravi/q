Template.productmaster.rendered = function() {

};

Template.productmaster.events({
  'click .btnEmptyCollection': function(event, template) {
    Meteor.call('emptyproducts');
  }
});

Template.productmaster.helpers({
  importStatus: function(isDone=true) {
    statust = __pre_excel_process.findOne({});
    if (statust) {
      if (statust.status == 'na' || statust.status=='DONE') {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  },
  statusdoc: function() {
    return __pre_excel_process.findOne();
  }
});
