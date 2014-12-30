
/**
 * Collections
 * @type {exports.Collection}
 */
Devices = new Meteor.Collection('devices');
Log = new Meteor.Collection('log');
Comments = new Meteor.Collection('comments');


/**
 * Everything down is router logic
 */
Router.configure({
    layoutTemplate: "mainLayout",
    loadingTemplate: "loading",
    notFoundTemplate: "missing"
});

/**
 * Controllers
 */
// Admin only pages
AdminAccessController = RouteController.extend({
    //On before action hook to check if the user is logged in and have the right privileges
    onBeforeAction: function() {
        var currentUser = Meteor.user();
        if (!(Meteor.loggingIn() || currentUser) || !(Roles.userIsInRole(currentUser, ['admin']))) {
            this.render("login");
        }
        // After IR > 1.* you need to call this.next() for better use of connection middleware
        else{
            // Subscriptions
            Meteor.subscribe('devices');
            Meteor.subscribe('users');
            Meteor.subscribe('log');
            Meteor.subscribe('comments');
            // After IR > 1.* you need to use this.next()
            // for better use of connection middleware
            this.next();
        }
    }
});
// Pages require login
UserAccessController = RouteController.extend({
    //On before action hook to check if the user is logged in
    onBeforeAction: function(){
        if (!(Meteor.loggingIn() || Meteor.user())) {
            this.render("login");
        } else{
            // Subscriptions
            Meteor.subscribe('devices');
            Meteor.subscribe('users');
            Meteor.subscribe('comments');
            // After IR > 1.* you need to use this.next()
            // for better use of connection middleware
            this.next();
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
    this.route('backup', {
        path: 'backup',
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
    this.route('feedback', {
        path: 'feedback',
        template: 'feedback',
        controller: UserAccessController
    });
    this.route('alerts', {
        path: 'alerts',
        template: 'alerts',
        controller: UserAccessController
    });

});
