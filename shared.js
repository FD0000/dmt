Devices = new Meteor.Collection('devices');
Log = new Meteor.Collection('log');

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
    this.route('add-device', {
        path: 'add-device',
        waitOn: function() {
            if (!(Meteor.loggingIn() || Meteor.user())) {
                this.redirect("login");
            }
            Meteor.subscribe('devices');
            Meteor.subscribe('users');
        }
    });
    this.route('book', {
        path: 'book/:_DeviceId',
        data: function(){
            return Devices.findOne({_id: this.params._DeviceId});
        },
        waitOn: function() {
            if (!(Meteor.loggingIn() || Meteor.user())) {
                this.redirect("login");
            }
            Meteor.subscribe('devices');
            Meteor.subscribe('users');
            Meteor.subscribe('log-by-id', this.params._DeviceId);
        }

    });
    this.route('bookedByMe', {
        path: 'booked-By-Me',
        template: 'bookedByMe',
        waitOn: function(){
            if (!(Meteor.loggingIn() || Meteor.user())) {
                this.redirect("login");
            } else{
                Meteor.subscribe('devices');
                Meteor.subscribe('users');
            }

        }

    });
    this.route('admin', {
        path: 'admin',
        waitOn: function() {
            if (!(Meteor.loggingIn() || Meteor.user())) {
                this.redirect("login");
            }
            Meteor.subscribe('devices');
            Meteor.subscribe('users');
        }
    });
});