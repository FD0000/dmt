Template.deviceGrid.devices = function() {
    return Devices.find({status: 'available'});
};

Template.admin.devices = function() {
    return Devices.find();
};