Devices = new Meteor.Collection('devices');
Log = new Meteor.Collection('log');

Router.configure({
    layoutTemplate: "mainLayout",
    loadingTemplate: "loading",
    notFoundTemplate: "missing"
});

/**
 * Controllers
 */
// Admin
AdminAccessController = RouteController.extend({
    waitOn: function() {
        var currentUser = Meteor.user();
        if (!(Meteor.loggingIn() || currentUser) || !(Roles.userIsInRole(currentUser, ['admin']))) {
            this.redirect("login");
        }
        Meteor.subscribe('devices');
        Meteor.subscribe('users');
        Meteor.subscribe('log');
    }
});
// User
UserAccessController = RouteController.extend({
    waitOn: function(){
        if (!(Meteor.loggingIn() || Meteor.user())) {
            this.redirect("login");
        } else{
            Meteor.subscribe('devices');
            Meteor.subscribe('users');
        }
    }
});

/**
 * Routes definition
 */
Router.map(function() {

    this.route('login', {
        path: 'login',
        waitOn: function() {
            if(Meteor.user()) {
                this.redirect("home");
            }
        }
    });

    // Routes requiring admin privileges
    this.route('logs', {
        path: 'logs',
        template:'logs',
        controller: AdminAccessController
    });
    this.route('users', {
        path: 'users',
        template:'users',
        controller: AdminAccessController
    });
    this.route('stats', {
        path: 'stats',
        template:'stats',
        controller: AdminAccessController
    });
    this.route('add-device', {
        path: 'add-device',
        controller: AdminAccessController
    });

    //Routes requiring login in
    this.route('home', {
        path: '/',
        controller: UserAccessController
    });
    this.route('book', {
        path: 'book/:_DeviceId',
        data: function(){
            return Devices.findOne({_id: this.params._DeviceId});
        },
        controller: UserAccessController
    });
    this.route('bookedByMe', {
        path: 'booked-By-Me',
        template: 'bookedByMe',
        controller: UserAccessController
    });

});
