Meteor.startup(function () {

    /**
     * In Progress: Connect to JIRA and retrieve all users.
     * Two possible scenarious:
     * 1. Connect to /rest/auth and generate OAuth token for later use.
     * 2. Connect directly to /rest/api with base64 encoded username and pass on every connect (not safe).
     */
//    HTTP.call("POST", "https://jira.powa.com/jira/rest/auth/1/session",
//        {
//            "username" : "mgorchev",
//            "password" : "Password123"
//        },
//        function(err, res){
//            if(err){
//                console.log(err);
//            }
//            else{
//                console.log(res);
//            }
//        }
//    );

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
         *      deviceType: Phone, tablet, etc.
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
                    deviceType: data.deviceType,
                    screenSize: data.screenSize,
                    releaseYear: data.releaseYear,
                    status: 'available',
                    bookedBy: '',
                    bookedOn: '',
                    bookedUntil: ''
                });
                Log.insert({
                    userEmail: Meteor.user().emails[0].address,
                    logEntry: 'added',
                    deviceManufacturer: data.deviceManufacturer,
                    deviceModel: data.deviceModel,
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
                        userEmail: Meteor.user().emails[0].address,
                        logEntry: 'booked',
                        deviceManufacturer: data.deviceManufacturer,
                        deviceModel: data.deviceModel,
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
                        userEmail: Meteor.user().emails[0].address,
                        logEntry: 'returned',
                        deviceManufacturer: data.deviceManufacturer,
                        deviceModel: data.deviceModel,
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
        },

        /**
         * Process users feedback
         * @param data - users input
         */
        addComment: function(data){
            if(data){
                Comments.insert({
                    userName: data.userName,
                    userEmail: data.userEmail,
                    userComment: data.userComment,
                    timeStamp: new Date().getTime()
                })
            }
        }
    });
});
