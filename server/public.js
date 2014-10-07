Meteor.publish('devices', function () {
    return Devices.find();
});

Meteor.publish('log', function () {
    return Log.find();
});

Meteor.publish('log-by-id', function (id) {
    return Log.find({deviceID: id});
});
