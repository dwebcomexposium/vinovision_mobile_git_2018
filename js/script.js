jQuery(document).ready(function() {
    var originWindowWidth = 1920;

    initNewsResizer('.gla-item', '.gla-item-title', '.gla-item-desc');
    initNewsResizer('.la-item-content', '.la-item-title a', '.la-item-desc');

    var paireCnt = 0,
        Cnt = 0,
        totalCnt =  jQuery('.front .list-articles article').length,
        articleHtml = '';
    jQuery('.front .list-articles article').each(function() {
        paireCnt++;
        Cnt++;
        articleHtml = articleHtml + '<article class="la-item slider-item">' + jQuery(this).html() + '</article>';

        if (paireCnt >= 2 || Cnt >= totalCnt) {
            jQuery(this).before('<div class="column">' + articleHtml + '</div>');

            jQuery(this).remove();
            paireCnt = 0;
            articleHtml = '';
        }
        else {
            jQuery(this).remove();
        }
    });
    
    jQuery('.gsf-trigger').click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    $('.gsf-fields').slideToggle();
});


    onResizeWindow();

    jQuery(window).resize(function() {
        onResizeWindow();
    });

    /*********** FUNCTIONS ******************/

    function initNewsResizer(item, itemTitle, itemDesc) {
        jQuery(item).each(function() {
            jQuery(itemTitle, this).attr('data-original-title', jQuery(itemTitle, this).text());
            jQuery(itemDesc, this).attr('data-original-desc', jQuery(itemDesc, this).text());
        });
    }

    function onResizeWindow() {
        newsResizer('.gla-item', '.gla-item-title', '.gla-item-desc', 30, 150);
        newsResizer('.la-item-content', '.la-item-title a', '.la-item-desc', 31, 150);
    }

    function newsResizer(item, itemTitle, itemDesc, itemTitleLength, itemDescLength) {
        jQuery(item).each(function() {

            var itemHeight = jQuery(this).height();

            if (jQuery(window).innerWidth() >= 983) {
                var title = jQuery(itemTitle, this).text();
                if (title.length > itemTitleLength)
                    jQuery(itemTitle, this).text(title.substring(0,itemTitleLength) + '...');

                var desc = jQuery(itemDesc, this).text();
                if (desc.length > itemDescLength)
                    jQuery(itemDesc, this).text(desc.substring(0,itemDescLength) + '...');

                jQuery(itemDesc, this).css('height', 35 * itemHeight / 100);
            }
            else {
                jQuery(itemTitle, this).text(jQuery(itemTitle, this).attr('data-original-title'));
                jQuery(itemDesc, this).text(jQuery(itemDesc, this).attr('data-original-desc'));
                if (jQuery(window).innerWidth() < 768) {
                    jQuery(itemDesc, this).css('height', 'auto');
                }
                else {
                    jQuery(itemDesc, this).css('height', 25 * itemHeight / 100);
                }
            }
        });
    }
});