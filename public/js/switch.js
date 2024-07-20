$(document).ready(function()
{
    const playground = $('#playground');
    assert(playground.length, 'Could not find #playground element.');

    const map = getStarsClassMap();

    playground.children().on('click', function ()
    {
        const e_this = $(this);

        if (e_this.hasClass(map.bk))
        {
            e_this.addClass(map.wt);
            e_this.removeClass(map.bk);
        }
        else if (e_this.hasClass(map.wt))
        {
            e_this.addClass(map.bk);
            e_this.removeClass(map.wt);
        }
        else
        {
            console.error('Unexpected element', e_this);
        }
    });
});