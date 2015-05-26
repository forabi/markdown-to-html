var through2 = require("through2"),
	fs = require("fs"),
	File = require("vinyl");

module.exports = function(options) {
	var no = 1;
	return through2.obj(function(file, enc, done) {
		if (!file.$) return done(null, file);

		var $ = file.$;

		$("img").each(function(i, el) {
			no = no + 1;
			var $el = $(el);
			var src = $el.attr("src");
			var alt = $el.attr("alt") || "الشكل رقم (" + no + ")";

			var img = new File({
				contents: fs.readFileSync(src),
				path: src
			});

			// var no = src.substr(0, src.length - 4);

			$el.parent("p").addClass("figure-container").prev("p").addClass("figure-p");

			$el.after("<br>" + alt);

			this.push(img);

		}.bind(this))

		file.contents = new Buffer(file.$.html());

		done(null, file);
	});
}
