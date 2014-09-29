Meteor.startup(function(){
    var dumpData = [
        {
            name: 'Samsung',
            img: 'samsung.jpg',
            description: 'Really cool device'
        },
        {
            name: 'HTC',
            img: 'htc.jpg',
            description: 'Really cool device'
        },
        {
            name: 'Apple',
            img: 'apple.jpg',
            description: 'Really cool device'
        }
    ];
    if(Devices.find().count() == 0){
        for(var i = 0; i < dumpData.length; i++){
            console.log('Inserting device...')
            Devices.insert(dumpData[i]);
        }
    }
});