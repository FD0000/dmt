Meteor.startup(function () {
    Devices.allow({
        insert: function (userId, doc) {
            //TODO implement this
        },
        remove: function (userId, doc) {
            //TODO implement this
        }
    });
});
