
Template.login.events({
  'click #create-init': function() {
      var registerButtons = '<button id="create-cancel" type="button" class="btn btn-default">Cancel</button><button id="register" type="button" class="btn btn-default">Create</button>';
      $('#button-switch').html(registerButtons);
      $('#create-init').hide();
      $('#create-pass').removeClass('hidden');
  },
  'click #create-cancel': function() {
      var loginButtons = '<button id="login" type="button" class="btn btn-default">Login</button>';
      $('#button-switch').html(loginButtons);
      $('#create-init').show();
      $('#create-pass').addClass('hidden');
  },
  'click #register': function(e,t) {
      var email = t.find('#userEmail').value + '@powa.com',
          password1 = t.find('#userPassword1').value,
          password2 = t.find('#userPassword2').value;

      //TODO implement validation
      if (validateRegister(email, password1, password2)) {
          Accounts.createUser({email: email, password: password1, profile: {role: 'user'}}, function(err){
              if (err) {
                  FlashMessages.sendError(err.reason);
                  console.log(err);
              } else {
                  console.log('user created');
                  Router.go('/');
              }
          });
      }
  },
  'click #login': function(e,t) {
      var email = t.find('#userEmail').value + '@powa.com',
          password = t.find('#userPassword1').value;

      console.log(email);

      Meteor.loginWithPassword(email, password, function(err) {
          if (err) {
              FlashMessages.sendError(err.reason);
              console.log(err);
          } else {
              console.log('Welcome back Meteorite!');
          }
      });
  }
});
