// Custom login system
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

  // Click on login
  'click #login': function(e,t) {
      var email = t.find('#userEmail').value + '@powa.com',
          password = t.find('#userPassword1').value;

      Meteor.loginWithPassword(email, password, function(err) {
          if (err) {
              FlashMessages.sendError(err.reason);
              console.log(err);
          } else {
              console.log('Welcome back Meteorite!');
          }
      });
  },

  // Same on Enter key pressed
  'keydown':function(e, t){
      if(e.keyCode == 13){
          var email = t.find('#userEmail').value + '@powa.com',
              password = t.find('#userPassword1').value;

          Meteor.loginWithPassword(email, password, function(err) {
              if (err) {
                  FlashMessages.sendError(err.reason);
                  console.log(err);
              } else {
                  console.log('Welcome back Meteorite!');
              }
          });
      }
  }
});

Template.mainLayout.events({
    // Redirects on click
   'click #addDevice': function(e,t){
       Router.go('/add-device')
   },
   // Clear collection
   'click #clearCollection': function(e,t){
       // Pass the ID of an item to delete and name of the collection to operate on.
       // ! Clear the whole collection if id is null !
       var data = {
           id: null,
           collection: $(e.currentTarget).data('collection')
       };
       // Call the server method with the collection name
       Meteor.call('clearCollection', data, function(err, response){
          err ? FlashMessages.sendError('Hmmm... operation unsuccessful!')
              : FlashMessages.sendSuccess('Operation successful!');
       });
   },

   'click .view-booked': function(e, t){
       e.preventDefault();
       Router.go('/booked-By-Me');
   }
});

Template.addDevice.events({

   'click #submit-device': function(e,t){
       // Create the vars needed
       var btn = $(e.currentTarget),
           form = btn.closest('#new-device-form'),
           osType = t.find('#osType').value,
           osIcon = '',
           deviceType = t.find('.radio-selection:checked').value,
           data = {};
       // Other type of device, e.g. iPod, Phablet
       if(deviceType == 'Other'){
           deviceType += ': ' + t.find('.other-device').value;
       }
       // Pick OS icon based on the OS type
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
       // Create data structure with all necessary details
       data = {
           deviceAssetNumber: t.find('#deviceAssetNumber').value,
           deviceManufacturer: t.find('#deviceManufacturer').value,
           deviceModel: t.find('#deviceModel').value,
           deviceImg: osIcon,
           OSType: osType,
           OSVersion: t.find('#osVersion').value,
           screenSize: t.find('#screenSize').value,
           releaseYear: t.find('#releaseYear').value,
           description: t.find('#deviceDesc').value,
           deviceType: deviceType
       };

       // Validate the data structure, if true, proceed
       if(validateDataObject(data)){
           Meteor.call('addDeviceToCollection', data, function(err, response){
               // Handle response
               err ? FlashMessages.sendError("Hmmm... you got an error, better fix this shit up!")
                   : FlashMessages.sendSuccess(data.deviceManufacturer + "-" + data.deviceModel + " successfully added to the list!");
               form.find('input, textarea').val('');
           });
       }
   }
});

Template.device.events({
   'click .book-btn': function(e,t){
       Router.go('/book/'+ this._id);
   },

   'click .delete-device': function(e, t){
       // Because Meteor is so awesome
       var deviceModel = this.model,
           data = {
           id: this._id,
           collection: $(e.currentTarget).data('collection')
        };
       // Call the server
       Meteor.call('clearCollection', data, function(err, response){
           // Handle response
           err ? FlashMessages.sendError("Hmmm... you got an error, better fix this shit up!")
               : FlashMessages.sendSuccess('Device <strong>' + deviceModel + '</strong> removed from the device list!');
       });
   }

});

Template.bookedDevice.events({
    'click .return-btn': function(e, t){
        var dataId = this._id,
            man = this.manufacturer,
            model = this.model,
            data = {
                deviceManufacturer: man,
                deviceModel: model,
                action: 'return',
                deviceId: dataId
            };

        Meteor.call('manageDevice', data, function(err, response){
            err ? FlashMessages.sendError("Hmmm... you got an error, better fix this shit up!")
                : FlashMessages.sendSuccess(man + "-" + model + " is now available for booking!");
        });
    }
});

Template.bookedByMe.events({
    'click .return-btn': function(e, t){
        var dataId = this._id,
            man = this.manufacturer,
            model = this.model,
            data = {
                deviceManufacturer: man,
                deviceModel: model,
                action: 'return',
                deviceId: dataId
            };

        Meteor.call('manageDevice', data, function(err, response){
            err ? FlashMessages.sendError("Hmmm... you got an error, better fix this shit up!")
                : FlashMessages.sendSuccess(man + "-" + model + " is now available for booking!");
        });
    }
});

Template.book.events({
   'click .save-booking': function(e, t){
       var startDateInput = t.find('#pick-a-start-date'),
           endDateInput = t.find('#pick-a-end-date'),
           man = this.manufacturer,
           model = this.model,
           data = {
               deviceManufacturer: man,
               deviceModel: model,
               action: 'book',
               startDate: startDateInput.value,
               endDate: endDateInput.value,
               deviceId: this._id
           };

       if(data.startDate = '' || data.endDate == ''){
           FlashMessages.sendError("Please fill all the fields!");
           startDateInput.focus();
       }
       else{
           Meteor.call('manageDevice', data, function(err, response){
               err ? FlashMessages.sendError("Hmmm... you got an error, better fix this shit up!")
                   : FlashMessages.sendSuccess(man + "-" + model + " successfully booked!");
               $(startDateInput).val('');
               $(endDateInput).val('');
               Router.go('/');
           });
       }
   }
});

Template.feedback.events({
    'click #submit-comment': function(e, t){
        var data = {
            userName: t.find('#name').value,
            userEmail: t.find('#email').value,
            userComment: t.find('#comment').value
        };

        Meteor.call('addComment', data, function(err, response){
            err ? FlashMessages.sendError("Hmmm... you got an error, better fix this shit up!")
                : FlashMessages.sendSuccess('Comment successfully sent!');
        })
    }
});