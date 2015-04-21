var through2 = require("through2")
    guessDir = require("./utils").guessDir,

module.exports = function(options) {
    var concat = "";
    var fallback = options.prefer || "ltr";

    return through2.obj(function(file, enc, done) {
        if (!file.$) return done(null, file);

        var total = { rtl: 0, ltr: 0 };

        var getTextDir = function(i, el) {
            var $el = file.$(el);
            var $clone = $el.clone();
            var text = $clone.remove('pre, code').text().trim() || $clone.text();
            var dir = guessDir(text, fallback);
            $el.attr('dir', dir);
            total[dir] += 1;
        }

        file.$('h1, h2, h3, h4, h5, h6, p, ul, ol, li, img, figure').each(getTextDir);

        file.dir = total.rtl > total.ltr ? "rtl" : "ltr";
        file.contents = new Buffer(file.$.html());
        done(null, file);
    });
}