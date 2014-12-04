/**
 * Template helpers:
 *
 * Provides useful data to the templates
 */

Template.mainLayout.helpers({
    myDevices: function(){
        return Devices.find({bookedBy: Meteor.user().emails[0].address}).count();
    }
});

Template.deviceGrid.helpers({
    devices: function() {
        return Devices.find({status: 'available'});
    }
});

Template.home.helpers({
    availableDevicesCount: function(){
        return Devices.find({status: 'available'}).count();
    },

    bookedDevicesCount: function(){
        return Devices.find({status: 'booked'}).count();
    }
});

Template.bookedDeviceGrid.helpers({
    bookedDevices: function(){
        return Devices.find({status: 'booked'});
    }
});

Template.admin.helpers({
    devices: function() {
        return Devices.find();
    }
});

Template.bookedByMe.helpers({
    deviceList: function(){
        return Devices.find({bookedBy: Meteor.user().emails[0].address});
    }
});

Template.logs.helpers({
    logList: function() {
        return Log.find({}, {sort: {timeStamp: -1}});
    },
    relativeTime: function(timeStamp){
        return moment(timeStamp).fromNow();
    }
});

Template.users.helpers({
    userList: function(){
        return Meteor.users.find({}, {sort: {createdAt: -1}}).fetch();
    },

    relativeTime: function(timeStamp){
        return moment(timeStamp).fromNow();
    },

    bookedByUser: function(email){
        return Devices.find({bookedBy: email}).count();
    }
});

Template.feedback.helpers({
    displayComments: function(){
        return Comments.find();
    },

    relativeTime: function(timeStamp){
        return moment(timeStamp).fromNow();
    }
});