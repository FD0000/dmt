
//FIXME improve this

validateRegister = function(user, password1, password2) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if ((user.length < 1) || !(filter.test(user))) {
        FlashMessages.sendError("I don't think that's a valid email address");
    } else if (password1.length < 6) {
        FlashMessages.sendError("Your password is not long enough! It should be over 6 characters.");
    } else if (password1 != password2) {
        FlashMessages.sendError("Your passwords do not match!");
    } else {
        return true;
    }
    return false;
};