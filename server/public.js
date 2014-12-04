Meteor.publish('devices', function () {
    return Devices.find();
});

Meteor.publish('log', function () {
    return Log.find();
});

Meteor.publish('users', function(){
    return Meteor.users.find();
});

Meteor.publish('comments', function () {
    return Comments.find();
});