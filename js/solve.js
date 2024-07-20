$(document).ready(function()
{
    const playground = $('#playground');
    assert(playground.length, 'Could not find #playground element.');

    const btn_bk = $('#solve-bk');
    assert(btn_bk.length, 'Could not find #btn_bk element.');

    const btn_wt = $('#solve-wt');
    assert(btn_wt.length, 'Could not find #btn_wt element.');

    const response = $('#response')
    assert(response.length, 'Could not find #response element.');

    /**
     * Outputs a message to the #response element.
     *
     * @param {string} msg
     */
    function reply(msg)
    {
        response.text(msg);
    }

    let data = null;

    fetch('data.bin').then((r) => {
        if (!r.ok)
        {
            reply('Не удалось загрузить данные :(');
            return;
        }

        r.blob().then(
            (blob) => blob.arrayBuffer()).then(
                (ab) => {
            data = Array.from(new Uint32Array(ab));
            data.unshift(0);

            reply('Решение будет выведено здесь.');
        });
    });

    /**
     * Returns current playground state as a number.
     *
     * @returns {number}
     */
    function getPlaygroundState()
    {
        let bin = ''
        const map = getStarsClassMap();

        for (const chd of playground.children())
        {
            const e_chd = $(chd);

            if (e_chd.hasClass(map.bk))
            {
                bin += '0'
            }
            else if (e_chd.hasClass(map.wt))
            {
                bin += '1'
            }
            else
            {
                reply('Доска сломалась :(');
                throw new Error('Unexpected element: ' + e_chd);
            }
        }

        return parseInt(bin, 2);
    }

    /**
     * Finds a solution.
     *
     * @param {boolean} reverse - reverse data or not.
     */
    function findSolution(reverse = false)
    {
        if (data === null)
        {
            return;
        }

        let src = data;

        if (reverse)
        {
            src = data.slice();
            src.reverse();
        }

        const state = getPlaygroundState();

        if (state > src.length)
        {
            reply('Не удалось найти решение :(');
            return;
        }

        const sequence = src[state];

        if (sequence === 0)
        {
            reply('Уже решено :)');
            return;
        }

        let steps = [];

        for (const ch of sequence.toString())
        {
            steps.push(ch);
        }

        reply(steps.join('-'));
    }

    btn_bk.on('click', () => findSolution());
    btn_wt.on('click', () => findSolution(true));
});