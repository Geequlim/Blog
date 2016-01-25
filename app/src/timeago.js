/**
 * Round.
 */

var round = Math.round;

/**
 * Get approximate human readable time with `date`.
 *
 * @param {Number|Date} date
 * @return {String}
 * @api public
 */

module.exports = function(date) {
  if (typeof date === 'string') date = new Date(date);
  var now = new Date;
  var t;

  // past / future
  var diff = date > now ? date - now : now - date;

  // just now
  if (1e3 > diff) return '刚刚';

  // s, m, h, d, w, m, y
  if (60 > (t = round(diff / 1e3))) return format(t, '秒前');
  if (60 > (t = round(diff / 6e4))) return format(t, '分钟前');
  if (24 > (t = round(diff / 3.6e+6))) return format(t, '小时前');
  if (7 > (t = round(diff / 8.64e+7))) return format(t, '天前');
  if (4.34812 > (t = diff / 6.048e+8)) return format(round(t), '周前');
  if (12 > (t = round(diff / 2.63e+9))) return format(t, '个月前');

  t = round(diff / 3.156e+10);
  return format(t, '年前');
};

function format(n, unit) {
  return n + unit;
}
