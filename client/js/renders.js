Template.login.rendered = function() {
    var drawEyes = function(num) {
        var pupil = $('.pupil')[num];
        var eye = $('.eye')[num];
        var pupil_radius = $(pupil).width()/2;
        var eye_radius = $(eye).width()/2;


        $(window).mousemove(function(e){
            var pos = eye.getBoundingClientRect(),
                dx = pos.left + eye_radius - e.pageX,
                dy = pos.top + eye_radius - e.pageY,
                d = Math.min(Math.sqrt(dx * dx + dy * dy), eye_radius - pupil_radius),
                angle = Math.atan2(dy, dx),
                eye_left = eye_radius - pupil_radius - d * Math.cos(angle),
                eye_top = eye_radius - pupil_radius - d * Math.sin(angle);
            $(pupil).css({left: eye_left, top: eye_top});
        });
    };

    var eye1 = new drawEyes(0);
    var eye2 = new drawEyes(1);
};

