Template.deviceGrid.devices = function() {
    return Devices.find({status: 'available'});
};
Template.bookedDeviceGrid.bookedDevices = function(){
    return Devices.find({status: 'booked'});
};

Template.admin.devices = function() {
    return Devices.find();
};

Template.bookedByMe.deviceList = function(){
    return Devices.find({bookedBy: Meteor.user().emails[0].address});
};