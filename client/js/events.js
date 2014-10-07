
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

Template.mainLayout.events({
   'click #addDevice': function(e,t){
       Router.go('/add-device')
   },

   'click #clearCollection': function(e,t){
       Meteor.call('clearCollection', function(err, response){
          err ? FlashMessages.sendError('Hmmm... operation unsuccessful!')
              : FlashMessages.sendSuccess('Operation successful!');
       });
   }
});

Template.addDevice.events({
   'click #submit-device': function(e,t){
       var btn = $(e.currentTarget),
           form = btn.closest('#new-device-form'),
           osType = form.find('#osType').val(),
           osIcon = '',
           data = {};

           switch (osType){
               case 'Android':
                   osIcon = 'android-icon.png';
                   break;
               case 'iOS':
                   osIcon = 'apple-icon.png';
                   break;
               case 'Windows':
                   osIcon = 'win-icon.png';
                   break;
               default:
                   osIcon = 'powa-icon.png'
           }

           data = {
               deviceManufacturer: form.find('#deviceManufacturer').val(),
               deviceModel: form.find('#deviceModel').val(),
               deviceImg: osIcon,
               OSType: osType,
               OSVersion: form.find('#osVersion').val(),
               screenSize: form.find('#screenSize').val(),
               releaseYear: form.find('#releaseYear').val(),
               description: form.find('#deviceDesc').val()
           };

       //console.log(form);

       Meteor.call('addDeviceToCollection', data, function(err, response){
           err ? FlashMessages.sendError("Hmmm... you got an error, better fix this shit up!")
               : FlashMessages.sendSuccess(data.deviceManufacturer + "-" + data.deviceModel + " successfully added to the list!");
                 form.find('input, textarea').val('');
       });
   }
});

Template.device.events({
   'click .book-btn': function(e,t){
       var btn = $(e.currentTarget),
           container = btn.closest('.device-holder'),
           dataId = container.data('deviceid');
       console.log(dataId);
       Router.go('/book/'+ dataId);
   }
});