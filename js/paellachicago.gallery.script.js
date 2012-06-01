paellachicago.gallery = {
    _slider: null,
    Init: function () {

        // assign the slider to a variable
        _slider = $('.gallery-images .images').bxSlider({
            controls: true,
            captions: true,
            prevText: '',
            nextText: '',
            captionsSelector: '.gallery-wrapper .gallery-text p',
            speed:1500
        });

        //assign fade events
        this.initBackAndForward();
        //this.initNextAndPrev(); This event will be handled in future. the intent is to hide and open the forward and next arrows

        // assign a click event to the external thumbnails
        $('.ad-thumbs a').click(function () {
            var thumbIndex = $('.ad-thumbs a').index(this);
            // call the "goToSlide" public function
            _slider.goToSlide(thumbIndex);
            // remove all active classes
            $('.ad-thumbs a').removeClass('pager-active');
            // assisgn "pager-active" to clicked thumb
            $(this).addClass('pager-active');
            // very important! you must kill the links default behavior
            return false;
        });

        // assign "pager-active" class to the first thumb
        $('.ad-thumbs a:first').addClass('pager-active');

        $(".gallery-images .images").height($(".gallery-images .images li:nth-child(1)").height());
        $(".gallery-images").height($(".bx-wrapper").height());
        $(".bx-wrapper").css("margin", "0 auto");

    },
    initNextAndPrev: function () {

        $next_link = $('#gallery-display .gallery-wrapper .gallery-images .bx-next');
        $prev_link = $('#gallery-display .gallery-wrapper .gallery-images .bx-prev');

        $next_link.append("<div class='next-image'></div>");
        $prev_link.append("<div class='prev-image'></div>");

        $next_link.add($prev_link)
                .mouseover(
                    function (e) {
                        // IE 6 hides the wrapper div, so we have to set it's width
                        $(this).css('height', $('#gallery-display .gallery-wrapper .gallery-images').height());
                        $(this).find('div').show();
                    }
                ).mouseout(
                    function (e) {
                        $(this).find('div').hide();
                    }
                )
    },
    initBackAndForward: function () {

        var $scroll_forward = $('#gallery-filmstrip-wrapper .gallery-filmstrip .right-arrow');
        var $scroll_back = $('#gallery-filmstrip-wrapper .gallery-filmstrip .left-arrow');
        var $ad_thumbs = $('#gallery-filmstrip-wrapper .gallery-filmstrip .ad-thumbs');
        var has_scrolled = 0;
        var thumbs_scroll_interval = false;

        $scroll_forward.add($scroll_back).click(
        function () {
            // We don't want to jump the whole width, since an image
            // might be cut at the edge


            var width = $ad_thumbs.width() - 50;

            if ($(this).is('.right-arrow')) {
                var left = $ad_thumbs.scrollLeft() + width;
            } else {
                var left = $ad_thumbs.scrollLeft() - width;
            };

            $ad_thumbs.animate({ scrollLeft: left + 'px' });
            return false;
        }
      ).css('opacity', 0.7).hover(
        function () {
            var direction = 'left';
            if ($(this).is('.right-arrow')) {
                direction = 'right';
            };
            thumbs_scroll_interval = setInterval(
            function () {
                has_scrolled++;
                // Don't want to stop the slideshow just because we scrolled a pixel or two
                //                if (has_scrolled > 30 ) {
                //                    context.slideshow.stop();
                //                };
                var left;
                left = $ad_thumbs.scrollLeft() + 1;

                if (direction == 'left') {
                    left = $ad_thumbs.scrollLeft() - 1;
                };
                $ad_thumbs.scrollLeft(left);
            },
            5
          );
            $(this).css('opacity', 1);
        },
        function () {
            has_scrolled = 0;
            clearInterval(thumbs_scroll_interval);
            $(this).css('opacity', 0.7);
        }
      );
    },
    Dispose: function () {
        _slider.destroyShow();
    },
    ChangeOpacity: function ($object, value) {
        $object.css('opacity', value)
    }
}