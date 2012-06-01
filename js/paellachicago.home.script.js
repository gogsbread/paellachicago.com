paellachicago.home = {
    _bxslider: null,
    Init: function () {
        var $vertopred = $(".shapes .2row-topred");
        var $verbottomred = $(".shapes .2row-bottomred");
        var $horrightred = $(".shapes .2column-rightred");
        var $horleftred = $(".shapes .2column-leftred");

        $horrightred.find("#row1 #col1").addClass("hor-bar-dark-grey");
        $horrightred.find("#row1 #col2").addClass("hor-rec-red");
        $horrightred.find("#row2 td").addClass("hor-bar-light-grey");
        $("#gallery-left #row1").children("#col1").append($horrightred);

        $verbottomred.find("#row2 td").addClass("ver-rec-red");
        $verbottomred.find("#row1 #col2").addClass("ver-bar-dark-grey");
        $verbottomred.find("#row1 #col1").addClass("ver-bar-light-grey");
        $("#gallery-left #row1").children("#col3").append($verbottomred);

        $vertopred.find("#row1 td").addClass("ver-rec-red");
        $vertopred.find("#row2 #col1").addClass("ver-bar-dark-grey");
        $vertopred.find("#row2 #col2").addClass("ver-bar-light-grey");
        $("#gallery-left #row2").children("#col1").append($vertopred);

        $horleftred.find("#row2 td").addClass("hor-bar-dark-grey");
        $horleftred.find("#row1 #col1").addClass("hor-rec-red");
        $horleftred.find("#row1 #col2").addClass("hor-bar-light-grey");
        $("#gallery-left #row3").children("#col2").append($horleftred);

        //Settting default - height and width
        // Followed tips and tricks from bxslider.com. ref:http://www.bxslider.com/examples
        this._bxslider = $('#picture-frame #gallery').bxSlider({
            auto: true,
            controls: false,
            speed:3000,
            captions: true,
            captionsSelector: '#text-right h2',
            
        });

        $("#picture-frame #gallery").height($("#picture-frame #gallery li:nth-child(1)").height());
        $("#picture-frame #slider").height($(".bx-wrapper").height());
        $(".bx-wrapper").css("margin", "0 auto");
    },
    Dispose: function () {
        this._bxslider.destroyShow();
    }
}