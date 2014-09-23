Devices = new Meteor.Collection('devices');

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