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

        insertLog: function(data){
            if(data){
                var execute = Log.insert({
                    userEmail: data.userEmail,
                    logEntry: data.logEntry,
                    deviceManufacturer: data.deviceManufacturer,
                    deviceModel: data.deviceModel,
                    timeStamp: data.timeStamp
                });
                return execute;
            }
        },

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
                var execute = Devices.insert({
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
                //Log.insert({
                //    userEmail: Meteor.user().emails[0].address,
                //    logEntry: 'added',
                //    deviceManufacturer: data.deviceManufacturer,
                //    deviceModel: data.deviceModel,
                //    timeStamp: new Date().getTime()
                //});
                return execute;
            }
        },

        /**
         * Single method handles book and return device
         * @param data
         */
        manageDevice: function(data){
            // Take different action based on the params

            // Booking
            switch(data.action){
                case 'book':
                    // Update the DB
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
                    // Record the operation
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
         * Reusable method for removing collection docs from the DB
         * @param data.id - if empty clear the whole collection
         * @param data.collection - collection name to operate on
         * @returns {*}
         */
        clearCollection: function(data){
            // Clear the whole collection
            if(data.id == null){
                global[data.collection].remove({});
                // Record the operation
                Log.insert({
                    userEmail: Meteor.user().emails[0].address,
                    logEntry: 'Collection '+ data.collection + ' deleted',
                    timeStamp: new Date().getTime()
                });
            } else {
                // Details of the item to be deleted
                var item = global[data.collection].findOne({_id: data.id});
                // Delete the item
                global[data.collection].remove(data.id);
                // Record the operation
                Log.insert({
                    userEmail: Meteor.user().emails[0].address,
                    logEntry: 'deleted',
                    deviceManufacturer: item.manufacturer,
                    deviceModel: item.model,
                    timeStamp: new Date().getTime()
                });
            }
        },

        /**
         * Process users feedback
         * @param data - users input
         */
        addComment: function(data){
            if(data){
                // Add the comment to the collection
                Comments.insert({
                    userName: data.userName,
                    userEmail: data.userEmail,
                    userComment: data.userComment,
                    timeStamp: new Date().getTime()
                });
                // Record the operation
                Log.insert({
                   userEmail: data.userEmail,
                   logEntry: 'New comment',
                   timeStamp: new Date().getTime()
                });
            }
        }
    });
});
