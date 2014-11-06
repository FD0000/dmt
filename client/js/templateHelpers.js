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
        return Log.find();
    },
    relativeTime: function(timeStamp){
        return moment(timeStamp).fromNow();
    }
});