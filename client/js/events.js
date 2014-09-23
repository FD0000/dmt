
Template.login.events({
  'click #create-init': function() {
      var registerButtons = '<button id="create-cancel" type="button" class="btn btn-default">Cancel</button><button type="button" class="btn btn-default">Create</button>';
      $('#button-switch').html(registerButtons);
      $('#create-init').hide();
      $('#create-pass').removeClass('hidden');
  },
  'click #create-cancel': function() {
      var loginButtons = '<button type="button" class="btn btn-default">Login</button>';
      $('#button-switch').html(loginButtons);
      $('#create-init').show();
      $('#create-pass').addClass('hidden');
  }
});
