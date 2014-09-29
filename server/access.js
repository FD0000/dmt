Meteor.startup(function () {
    Devices.allow({
        insert: function (userId, doc) {
            //TODO implement this
        },
        remove: function (userId, doc) {
            //TODO implement this
        }
    });

    return Meteor.methods({

        addDeviceToCollection: function(data){
            if(data){
                Devices.insert({
                    name: data.deviceName,
                    img: data.deviceImg,
                    description: data.deviceDesc
                });
            }
        },

        // Can be called with or without arguments
        // Clear the WHOLE collection if no arguments
        clearCollection: function(id){
            if(id == null){
                return Devices.remove({});
            } else {
                Devices.remove(id);
            }
        }
    });
});
