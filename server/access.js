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

        addDeviceToCollection: function(data){
            if(data){
                Devices.insert({
                    name: data.deviceName,
                    img: data.deviceImg,
                    description: data.deviceDesc
                });
            }
        }
    });
});
