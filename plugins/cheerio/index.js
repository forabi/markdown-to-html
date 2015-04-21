var cheerio = require("cheerio")
	through2 = require("through2");

module.exports = function() {
	return through2.obj(function(file, enc, done) {
		file.$ = cheerio.load(String(file.contents));
		done(null, file);
	});
}