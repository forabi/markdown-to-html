var through2 = require("through2"),
	marked = require("marked"),
	path = require("path"),
	renderer = require("./renderer");

marked.setOptions({ renderer: renderer });

module.exports = function() {
	return through2.obj(function(file, enc, done) {
		var md = file.contents.toString();
		file.contents = new Buffer(marked(md));
		file.path = file.path.replace(new RegExp(path.extname(file.path) + "$"), ".html");
		done(null, file);
	})
}
