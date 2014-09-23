Devices = new Meteor.Collection('devices');

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

Router.configure({
    layoutTemplate: "mainLayout"
//    loadingTemplate: "loading", //TODO implement loading template
//    notFoundTemplate: "notFound" //TODO implement notFound template
});

//Router.onBeforeAction('loading');

Router.map(function() {
    this.route('home', {
        path: '/',
        waitOn: function() {
            if (!(Meteor.loggingIn() || Meteor.user())) {
                this.redirect("login");
            }
            Meteor.subscribe('devices');
            Meteor.subscribe('users');
        }
    });
    this.route('login', {
        path: 'login',
        waitOn: function() {
            if(Meteor.user()) {
                this.redirect("home");
            }
        }
    });
});