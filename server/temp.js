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
        }
    ];
    if(Devices.find().count() == 0){
        for(var i = 0; i < dumpData.length; i++){
            console.log('Inserting device...');
            Devices.insert(dumpData[i]);
        }
    }
});