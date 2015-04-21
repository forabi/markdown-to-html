var through2 = require("through2"),
	fs = require("fs"),
	File = require("vinyl");

module.exports = function(options) {
	return through2.obj(function(file, enc, done) {
		if (!file.$) return done(null, file);

		var $ = file.$;

		$("img").each(function(i, el) {
			var $el = $(el);
			var src = $el.attr("src");

			var img = new File({
				contents: fs.readFileSync(src),
				path: src
			});

			var no = src.substr(0, src.length - 4);

			$el.replaceWith("<figure no='" + no + "'><img src='" + src + "'/></figure>")

			this.push(img);

		}.bind(this))

		file.contents = new Buffer(file.$.html());

		done(null, file);
	});
}