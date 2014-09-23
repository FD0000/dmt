Meteor.startup(function(){
    var dumpData = [
        {
            name: 'Samsung',
            img: 'samsung.jpg',
            details: 'Really cool device'
        },
        {
            name: 'HTC',
            img: 'htc.jpg',
            details: 'Really cool device'
        },
        {
            name: 'Apple',
            img: 'apple.jpg',
            details: 'Really cool device'
        }
    ];
    if(Devices.find().count() == 0){
        for(var i = 0; i < dumpData.length; i++){
            Devices.insert(dumpData[i]);
        }
    }
});