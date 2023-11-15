$(document).ready(function(){
    $("form").submit(function() {
        var form = $(this);
        // var buttoncontent = form.find('button').html();
        // form.find('button').text('Sending...');
        var msg = form.serialize();
        var emailaprove = 0;
        form.find('input[data-required], input[required]').closest('.inp-wrp').append('<div class="error">Please fill this field</div>');
        function emailtest() {
            var ouremail = form.find('input.inp-email');
            if (ouremail.length) {
                if(ouremail.val() != '') {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if(pattern.test(ouremail.val())){
                    emailaprove = 1;
                } else {
                    ouremail.addClass('required');
                    emailaprove = 0;
                }
                } else {
                    ouremail.addClass('required');
                    emailaprove = 0;
                }
            }else{
                emailaprove = 1;
            }; 
        };
        emailtest();
        var faults = form.find('input').filter(function() {
        return $(this).data('required') && $(this).val() === "";
        }).addClass('required');
        if ((faults.length) || (emailaprove < 1)) {
            // form.find('button').html(buttoncontent);
            return false;
        }
        else {
            try {  
                var formdata = false;
                if (window.FormData){
                    formdata = new FormData(form[0]); 
                }
            } catch (err) { }
            $('input[type=file]',form).each(function() {
                var files = $(this).prop('files');
                if ( files != undefined && files.length <= 0 ) {
                    formdata.delete($(this).attr('name'));              
                }
            });
            $.ajax({
                type: "POST",
                url: "/mailer/mail.php",
                data: msg,
                data: formdata ? formdata : msg,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    // form.find('button').html(buttoncontent);
                    $('#thanks-popup').show();
                    $(".dialogs").show();
                    $(".dialogs").animate({"opacity":1}, 200, function() {
                        $('#thanks-popup').addClass('active');
                    }); 
                    // ym(XXXXXXXX,'reachGoal','order');
                    // gtag('event', 'sendform', {
                    //   'event_category': 'form',
                    //   'event_action': 'order',
                    // });
                    // fbq('track', 'Lead');
                    form[0].reset();
                },
                error:  function(data) {
                    alert('Error');
                    // form.find('button').html(buttoncontent);
                }
            });
        }
        return false;
    });
    $('input, textarea').on('click focus', function(){
        $(this).removeClass('required');
    });
    $('input[type="checkbox"][name="checkpolicy"]').on('change', function(){
        if ($(this).is(':checked')) {
            $(this).closest('form').find('button').removeAttr('disabled');
        } else {
            $(this).closest('form').find('button').attr('disabled','');
        }
    });
});