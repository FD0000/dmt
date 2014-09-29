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

        /**
         * Add New Device to the list
         * @param data = {
         *      deviceManufacturer: Manufacturer
         *      deviceModel: Device's model
         *      deviceImg: Image of the OS
         *      OSType: OS type
         *      OSVersion: OS version
         *      screenSize: Device screen size
         *      releaseYear: Year released
         *      description: Description if any
         *      status: available/not-available
         *  };
         */
        addDeviceToCollection: function(data){
            if(data){
                Devices.insert({
                    manufacturer: data.deviceManufacturer,
                    model: data.deviceModel,
                    img: data.deviceImg,
                    description: data.description,
                    OSType: data.OSType,
                    OSVersion: data.OSVersion,
                    screenSize: data.screenSize,
                    releaseYear: data.releaseYear,
                    status: 'available'
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
