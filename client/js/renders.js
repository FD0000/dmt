
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

Template.book.rendered = function(){
    $('#pick-a-start-date, #pick-a-end-date').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayBtn: true,
        todayHighlight: true
    });
};

Template.stats.rendered = function(){
    Deps.autorun(function(){
        (function drawChart(){
            // Get the data
            var available = Devices.find({status: 'available'}).count();
            var booked = Devices.find({status: 'booked'}).count();
            // Basic chart, read the docs to enhance it
            if(available != 0 || booked != 0){
                var chart = c3.generate({
                    bindto: '#chart',
                    size: {
                        width: 300,
                        height: 280
                    },
                    data: {
                        // iris data from R
                        columns: [
                            ['Available', available],
                            ['Booked', booked]
                        ],
                        type : 'pie'
                    }
                });
            } else {
                // Empty chart
                $('#chart').html('<p class="empty-coll">No stats at all...</p>');
            }
            // Stats bar
//        var stats = $('.stats');
//        stats.find('.completed').html(completed);
//        stats.find('.not').html(notDone);
//        stats.find('.total').html(notDone + completed);
        })();
    })
};

