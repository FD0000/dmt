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
            screenSize: '380x620',
            releaseYear: '2014',
            status: 'available',
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
            screenSize: 'Unknown',
            releaseYear: '2016',
            status: 'available',
            bookedBy: ''
        }
    ];
    if(Devices.find().fetch().length === 0){
        for(var i = 0; i < dumpData.length; i++){
            console.log('Inserting device...');
            Devices.insert(dumpData[i]);
        }
    }
    if(Log.find().fetch().length === 0){
        for(var j = 0; j < Devices.find().fetch().length; j++){
            console.log('Inserting fake log entry...');
            var logEntry = {
                deviceId: Devices.find().fetch()[j]._id,
                userId: 'ninja',
                action: 'added',
                dateStart: new Date(),
                dateEnd: null
            };
            Log.insert(logEntry);
        }
    }

//    var users = [
//        {
//            name:"Powa Frontend",
//            email:"fe-dev@powa.com",
//            roles:['admin']
//        }
//    ];
//
//    _.each(users, function (user) {
//        var id;
//
//        id = Accounts.createUser({
//            email: user.email,
//            password: "apple1",
//            profile: { name: user.name }
//        });
//
//        if (user.roles.length > 0) {
//            // Need _id of existing user record so this call must come
//            // after `Accounts.createUser` or `Accounts.onCreate`
//            Roles.addUsersToRoles(id, user.roles);
//        }
//        console.log('User added');
//    });

});