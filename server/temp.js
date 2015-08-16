Meteor.startup(function(){
    var dumpData = [
        {
            assetNumber: 1233,
            manufacturer: 'Apple',
            model: 'iPhone 6',
            img: 'apple-icon.png',
            description: 'Another awesome device',
            OSType: 'iOS',
            OSVersion: '8.0.1',
            deviceType: 'Phone',
            screenSize: '320x567',
            releaseYear: '2014',
            status: 'available',
            bookedBy: ''
        },
        {
            assetNumber: 1234,
            manufacturer: 'HTC',
            model: 'One M8',
            img: 'android-icon.png',
            description: 'Another awesome device',
            OSType: 'Android',
            OSVersion: '4.0.5.78',
            deviceType: 'Phone',
            screenSize: '420x768',
            releaseYear: '2014',
            status: 'available',
            bookedBy: ''
        },
        {
            assetNumber: 1235,
            manufacturer: 'Nokia',
            model: 'Lumia 9000',
            img: 'win-icon.png',
            description: 'Another awesome device',
            OSType: 'Windows',
            OSVersion: '3.4.56',
            deviceType: 'Phone',
            screenSize: '380x620',
            releaseYear: '2014',
            status: 'booked',
            bookedBy: ''
        },
        {
            assetNumber: 1236,
            manufacturer: 'Apple',
            model: 'iPhone 7',
            img: 'apple-icon.png',
            description: 'Another awesome device',
            OSType: 'Apple',
            OSVersion: '>9000',
            deviceType: 'Other: Phablet',
            screenSize: '9999x9999',
            releaseYear: '2016',
            status: 'available',
            bookedBy: ''
        },
        {
            assetNumber: 1237,
            manufacturer: 'LG',
            model: 'Nexus 6.5',
            img: 'android-icon.png',
            description: 'Another awesome device',
            OSType: 'Android',
            OSVersion: '6.65 Chewing Gum',
            deviceType: 'Phone',
            screenSize: 'Unknown',
            releaseYear: '2016',
            status: 'booked',
            bookedBy: ''
        }
    ];

    var deviceData = Devices.find().fetch();
    Meteor.users.remove({});
    Log.remove({});

    if(deviceData.length === 0){
        for(var i = 0; i < dumpData.length; i++){
            console.log('Inserting device...');
            Devices.insert(dumpData[i]);
        }
    }

    if(Log.find().fetch().length === 0){
        for(var j = 0; j < dumpData.length; j++){
            console.log('Inserting fake log entry...');
            var current = dumpData[j];
            var logEntry = {
                    userEmail: 'user@powa.com',
                    logEntry: Math.random() > 0.5 ? 'booked' : 'returned',
                    deviceManufacturer: current.deviceManufacturer,
                    deviceModel: current.deviceModel,
                    timeStamp: new Date().getTime()
                };
            Log.insert(logEntry);
        }
    }


    /**
     * Always add the admin user if not there
     */
    if(Meteor.users.findOne({ 'profile.name': 'Demo Admin'})){
        console.log('Admin account already activated...'.green);
    }
    else{
        var users = [
            {
                name: "Demo Admin",
                email: "admin@powa.com",
                roles: ['admin']
            },
            {
                name: "Demo User",
                email: "user@powa.com",
                roles: ['user']
            }
        ];

        _.each(users, function (user) {
            var id;

            id = Accounts.createUser({
                email: user.email,
                password: "apple1",
                profile: { name: user.name }
            });

            if (user.roles.length > 0) {
                // Need _id of existing user record so this call must come
                // after `Accounts.createUser` or `Accounts.onCreate`
                Roles.addUsersToRoles(id, user.roles);
            }
            console.log('Creating admin account...'.yellow);
            console.log('Done! Account ready to use.'.green);
        });
    }

});
