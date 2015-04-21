var through2 = require("through2"),
	File = require("vinyl");

module.exports = function(filename) {
	var concat = "";
	return through2.obj(function(file, enc, done) {
		concat += file.contents.toString();
		done(null, null);

	}, function(done) {
		this.push(new File({
			path: filename,
			contents: new Buffer(concat)
		}))
	})
}