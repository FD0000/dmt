Template.deviceGrid.devices = function() {
    return Devices.find({status: 'available'});
};
Template.bookedDeviceGrid.bookedDevices = function(){
    return Devices.find({status: 'booked'});
};

Template.admin.devices = function() {
    return Devices.find();
};