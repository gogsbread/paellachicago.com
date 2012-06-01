paellachicago.contact = {
    Init: function () {
        $('.error').hide();
        $('.loader').hide();
        $('#contact').show();
        

        $('.text-input').focus(function () {
            $(this).css({ backgroundColor: "#FFDDAA" });
        });
        $('.text-input').blur(function () {
            $(this).css({ backgroundColor: "#FFFFCC" });
        });

        $("#contact .email-form #iptName").focus();

        $("#contact .email-form #btnSubmit").click(function () {
            // validate and process form
            // first hide any error messages
            $('.error').hide();
            $('.loader').hide();
            $('#contact').show();

            var name = $("#contact .email-form #iptName").val();
            if (name == "") {
                $("#contact .email-form #lblNameError").show();
                $("#contact .email-form #iptName").focus();
                return false;
            }
            var email = $("#contact .email-form #iptEmail").val();
            if (email == "") {
                $("#contact .email-form #lblEmailError").show();
                $("#contact .email-form #iptEmail").focus();
                return false;
            }
            var phone = $("#contact .email-form #iptPhone").val();
            var zip = $("#contact .email-form #iptZip").val();
            var message = $("#contact .email-form #txtareaMessage").val();
            if (message == "") {
                $("#contact .email-form #lblMessageError").show();
                $("#contact .email-form #txtareaMessage").focus();
                return false;
            }

            var dataString = 'name=' + name + '&email=' + email + '&phone=' + phone + '&zip=' + zip + '&message=' + message;
            //alert(dataString); return false;
            $('#contact').hide();
            $('.loader').show();

            $.ajax({
                type: "POST",
                url: "MailHelper.aspx",
                data: dataString,
                error: function () {
                    $('.loader').hide();
                    $('#contact').show();
                    $('#contact').html("<div id='status'></div>");
                    $('#contact #status').append(paellachicago.contact.ErrorText);
                },
                success: function (data, textStatus, jqXHR) {
                    $('.loader').hide();
                    $('#contact').show();

                    if (data == "Succeeded") {
                        $('#contact').html("<div id='status' class='clearfix' style='width:310px'></div>");
                        $('#contact #status')
                                .hide()
                                .fadeIn(1500, function () {
                                    $('#contact #status').append("<div style='float:left;width:70px'><img id='checkmark' src='img/contact/check.png' /></div>");
                                })
                                .append("<div style='float:right'>" + paellachicago.contact.SuccessText + "</div>");
                    }
                    else {
                        $('#contact').html("<div id='status'></div>");
                        $('#contact #status').append(paellachicago.contact.ErrorText);
                    }

                }
            });
            return false;
        });

        $("#contact .email-form #btnClear").click(function () {
            // validate and process form
            // first hide any error messages
            $('.error').hide();
            $('#contact .email-form .text-input').val('');

            return false;
        });
    },
    Dispose: function () {
    },
    ErrorText: "<h2 class='text-label'>Oops!!! Something went wrong when sending your request. </h2><br/><br/><p class='text-label'>Please use your favorite email provider to send email to <span class='bold'>paellachicago@yahoo.com</span> or call me at <span class='bold'>708-218-8582</span>.</p>",
    SuccessText: "<h2 class='text-label'>Contact Form Submitted!</h2><br/><br/><p class='text-label'>We will be in touch soon.</p>"
}