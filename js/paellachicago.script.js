/* Author: Antony Thomas
NameSpace: paellachicago
1) consider moving contentholder as global variable or into .settings file
2) Change the child page hook up to use the settings file CONTENT_PAGE_HTML_ID
3) Use josebox in JS instead of content
*/

var paellachicago = {
    common: {
        Init: function () {
            /* 1 */
            //Gets the settings files and applies all settings in the master(default) page.
            $.getJSON('settings.json', function (settings) {
                CONSTANTS = settings.constants;
                $.each(settings.tabs, function (tabname, tabvalue) {
                    var $contentholder = $('#' + settings.constants.MASTER_CONTENT_HOLDER);
                    var $style = $('style');
                    var $head = $('head');
                    var $unorderedlist = $('.tabcontainer ul');
                    var $listitem = $('<li><a href="#" class="tab">' + tabname + '</a></li>');
                    $unorderedlist.append($listitem);
                    /*
                    1) storing page value in data property
                    2) adding click event for active tab change
                    3) adding click event for loading content
                    */
                    var $tabanchor = $listitem.find('a');
                    $tabanchor.data('page', tabvalue); /*1*/
                    $tabanchor.click(function () {
                        var $thisanchor = $(this);
                        $unorderedlist.find('.active').removeClass('active');
                        $thisanchor.addClass('active'); /*2*/
                        if (!$thisanchor.data('HTMLcache')) {
                            /* If no cache is present, show the gif preloader and run an AJAX request: */
                            $contentholder.html('<img src="img/ajax_preloader.gif" width="64" height="64" class="preloader" />');

                            $.get($thisanchor.data('page'), function (contentpage) {
                                var $contentpage = $(contentpage);
                                var HTML = $contentpage.find('#' + settings.constants.CONTENT_PAGE_ID).html();
                                var CSS = $contentpage.find('#' + settings.constants.CONTENT_PAGE_CSS_ID).text();
                                var $JS = $contentpage.find('#' + settings.constants.CONTENT_PAGE_JS_ID);
                               

                                if (paellachicago.navigation.previousAnchor != null) {

                                    var $previousAnchor = paellachicago.navigation.previousAnchor;
                                    paellachicago.content.Destroy($previousAnchor.data('JScache').children('#' + settings.constants.CONTENT_PAGE_JS_DISPOSE).text());
                                }

                                paellachicago.content.RenderHTML(HTML, $contentholder);
                                paellachicago.content.RenderCSS(CSS, $style);
                                paellachicago.content.RenderJS($JS.children('#' + settings.constants.CONTENT_PAGE_JS_FILE).text(), $head);
                                paellachicago.content.Init($JS.children('#' + settings.constants.CONTENT_PAGE_JS_INIT).text());

                                /* After page was received, add it to the cache for the current hyperlink: */
                                $thisanchor.data('HTMLcache', HTML);
                                $thisanchor.data('JScache', $JS);

                                paellachicago.navigation.previousAnchor = $thisanchor;

                                //redfine body height based on the height of the loaded contents + 15px offset for the footer to start. 
                                $('.body').height($('.navcontainer').height() + $('.contentbody').height() + 15);
                            });
                        }
                        else {
                            var $JScache = $thisanchor.data('JScache');
                            var $HTMLcache = $thisanchor.data('HTMLcache')

                            if (paellachicago.navigation.previousAnchor != null) {
                                var $previousAnchor = paellachicago.navigation.previousAnchor;
                                paellachicago.content.Destroy($previousAnchor.data('JScache').children('#' + settings.constants.CONTENT_PAGE_JS_DISPOSE).text());
                            }

                            paellachicago.content.Destroy($JScache.children('#' + settings.constants.CONTENT_PAGE_JS_DISPOSE).text());
                            paellachicago.content.RenderHTML($HTMLcache, $contentholder);
                            paellachicago.content.Init($JScache.children('#' + settings.constants.CONTENT_PAGE_JS_INIT).text());

                            paellachicago.navigation.previousAnchor = $thisanchor;

                            //redfine body height based on the height of the loaded contents. 
                            $('.body').height($('.navcontainer').height() + $('.contentbody').height() + 15);
                        }

                    });

                });
                //Set the height for .contentbody
                //$('.contentbody').height($('.body').height() - $('.navcontainer').height());
                /* Emulating a click on the first tab so that the content area is not empty: */
                $('.tab').eq(0).click();
            });

        }
    },
    navigation: {
        create: function () {
        },
        previousAnchor: null
    },
    content: {
        RenderHTML: function (htmlcontent, $contentholder) {
            $contentholder.html(htmlcontent);
        },
        RenderCSS: function (csscontent, $contentholder) {
            $contentholder.append(csscontent);
        },
        RenderJS: function (jscontent, $contentholder) {
            $('<script src="' + jscontent + '"></script>').appendTo($contentholder);
        },
        Init: function (fn_name) {
            eval(fn_name);
        },
        Destroy: function (fn_name) {
            eval(fn_name);
        }
    }
}






