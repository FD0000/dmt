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
         *      status: available/booked
         *      bookedBy: ''
         *      bookedOn: '',
         *      bookedUntil: ''
         *  };
         */
        addDeviceToCollection: function(data){
            if(data){
                Devices.insert({
                    assetNumber: data.deviceAssetNumber,
                    manufacturer: data.deviceManufacturer,
                    model: data.deviceModel,
                    img: data.deviceImg,
                    description: data.description,
                    OSType: data.OSType,
                    OSVersion: data.OSVersion,
                    screenSize: data.screenSize,
                    releaseYear: data.releaseYear,
                    status: 'available',
                    bookedBy: '',
                    bookedOn: '',
                    bookedUntil: ''
                });
                Log.insert({
                    logEntry: data.deviceManufacturer + ' ' + data.deviceModel + ' added to the list of devices!',
                    timeStamp: new Date().getTime()
                });
            }
        },

        /**
         * Single method handles book and return device
         * @param data
         */
        manageDevice: function(data){

            switch(data.action){
                case 'book':
                    Devices.update(data.deviceId,
                        {
                            $set: {
                                status: 'booked',
                                bookedBy: Meteor.user().emails[0].address,
                                bookedOn: data.startDate,
                                bookedUntil: data.endDate
                            }
                        }
                    );
                    Log.insert({
                        logEntry: data.deviceManufacturer + ' ' + data.deviceModel + ' booked by ' + Meteor.user().emails[0].address,
                        timeStamp: new Date().getTime()
                    });
                    break;

                case 'return':
                    Devices.update(data.deviceId,
                        {
                            $set: {
                                status: 'available',
                                bookedBy: '',
                                bookedOn: '',
                                bookedUntil: ''
                            }
                        }
                    );
                    Log.insert({
                        logEntry: data.deviceManufacturer + ' ' + data.deviceModel + ' is now available',
                        timeStamp: new Date().getTime()
                    });
                    break;
            }
        },

        /**
         * Remove devices from the DB
         * @param id - if empty clear all Devices
         * @returns {*}
         */
        clearCollection: function(id){
            if(id == null){
                return Devices.remove({});
            } else {
                Devices.remove(id);
            }
        }
    });
});
