Meteor.startup(function(){
    var dumpData = [
        {
            manufacturer: 'Apple',
            model: 'iPhone 6',
            img: 'apple-icon.png',
            description: 'Another awesome device',
            OSType: 'iOS',
            OSVersion: '8.0.1',
            screenSize: '320x567',
            releaseYear: '2014',
            status: 'available'
        },
        {
            manufacturer: 'HTC',
            model: 'One M8',
            img: 'android-icon.png',
            description: 'Another awesome device',
            OSType: 'Android',
            OSVersion: '4.0.5.78',
            screenSize: '420x768',
            releaseYear: '2014',
            status: 'available'
        },
        {
            manufacturer: 'Nokia',
            model: 'Lumia 9000',
            img: 'win-icon.png',
            description: 'Another awesome device',
            OSType: 'Windows',
            OSVersion: '3.4.56',
            screenSize: '380x620',
            releaseYear: '2014',
            status: 'available'
        },
        {
            manufacturer: 'Apple',
            model: 'iPhone 7',
            img: 'apple-icon.png',
            description: 'Another awesome device',
            OSType: 'Apple',
            OSVersion: '>9000',
            screenSize: '9999x9999',
            releaseYear: '2016',
            status: 'booked'
        },
        {
            manufacturer: 'LG',
            model: 'Nexus 6.5',
            img: 'android-icon.png',
            description: 'Another awesome device',
            OSType: 'Android',
            OSVersion: '6.65 Chewing Gum',
            screenSize: 'Unknown',
            releaseYear: '2016',
            status: 'booked'
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
});