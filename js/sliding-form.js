(function($){
    $.fn.sidePanelForm = function (options) {
        var settings = $.extend({
            title   : 'Get Your Free Quote',
            color   : '#0059af'
        }, options);

        if(settings.form_id){
            if($(settings.form_id).length){
                $('body').append('<a href="'+settings.form_id+'" class="request_consultation">Get Your Free Quote</a>\
                <div class="sliding-form-holder">\
                    <div class="panel-overlay"></div>\
                    <div class="contact-form text-black form-toggle" style="right: -460px;"> <a class="close text-capitalize text-right"> <span aria-hidden="true">×</span></a>\
                        <h2 class="title">'+settings.title+'</h2>\
                        <p>Fill out the form below and \
                            <br> we will get in touch with you shortly</p>\
                    </div>\
                </div>\
                ');



                createForm(settings.form_id);

                $('.request_consultation, .contact-form .title').css('color', settings.color);

                $('.request_consultation').hover(function() {
                    $(this).css({
                        "background-color" : settings.color,
                        "color" : "#fff"
                    });
                  }, function() {
                    $(this).css({
                        "background-color" : '#fff',
                        "color" : settings.color
                    });
                  });

                $('.request_consultation').on('click', function(e){
                    e.preventDefault();
            
                    var screenWidth = screen.width;
                    var bodyWidth = $('body').outerWidth();
                    if (screenWidth > bodyWidth){
                        var bodyCurrentPadding = parseInt($('body').css('padding-right'));
                        var body_padding = (bodyCurrentPadding + (screenWidth - bodyWidth)) + 'px';
                        
                        $('body').css('padding-right', body_padding);
                    }
                    
                    $('.sliding-form-holder form:not(.filter) :input:visible:enabled:first').focus();
                    $('body').addClass('sidebar-open');
                })
            
                $('.contact-form .close').on('click', function(){
                    hideSidebar();
                })
                $('.panel-overlay').on('click', function(){
                    hideSidebar();
                });
            
                function hideSidebar(){
                    $('body').removeClass('sidebar-open');
                    $('body').css('padding-right', "");
                }
                
            }
        }

        function createForm(formId){
            var form_html_id = "slide_panel_form";
    
            $(formId).clone().attr('id', form_html_id).appendTo('.sliding-form-holder .contact-form').append('<span class="cta-sub">*Your details are kept confidential</span>');
    
            $("#"+form_html_id).find('.form-group').each(function() {
                $(this).children().each(function() {
                    var typeName = $(this).prop('nodeName');
                    if(typeName == 'LABEL'){
                        var oldID = $(this).attr('for');
                        var newID = oldID + "_sldFrm";

                        $(this).attr('for', newID);
                    } else {
                        var oldID = $(this).attr('id');
                        var newID = oldID + "_sldFrm";

                        $(this).attr('id', newID);
                    }
                });
            });
    
            if(!jQuery().validate){
                //if jQuery Validate doesn't exist, add it to the page from the CDN
                $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min.js')
                    .done(function() {
                        applyFormValidation();
                    });
            } else {
                applyFormValidation();
            }

            $("<link/>", {
                rel: "stylesheet",
                type: "text/css",
                href: "css/sliding-form.css"
             }).appendTo("head");

            function applyFormValidation(){
                $('#'+form_html_id).validate({
                    errorPlacement: function (error, element)
                    {
                        element.after(error);
                    }
                });
            }
        }
    }
})(jQuery);