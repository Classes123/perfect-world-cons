/**
 * Alternative to C assert().
 *
 * @param {boolean} exp - Expression
 * @param {string} [msg] - Failure message
 */
function assert(exp, msg)
{
    if (!exp)
    {
        throw new Error(msg || 'Assertion failed');
    }
}

/**
 * Builds star CSS class.
 *
 * @param {string} suffix
 */
function buildStarClass(suffix)
{
    return 'cons-star--' + suffix
}

/**
 * @returns {{bk: string, wt: string}} stars CSS class map
 */
function getStarsClassMap()
{
    return {
        bk: buildStarClass('black'),
        wt: buildStarClass('white')
    };
}