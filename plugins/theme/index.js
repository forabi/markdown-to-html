var through2 = require("through2"),
	fs = require("fs"),
	path = require("path"),
	File = require("vinyl"),
	jade = require("jade");

module.exports = function(theme, options) {
	return through2.obj(function(file, enc, done) {
		var templateFile;
		if (!path.extname(file.path).match(/\.html?/i)) return done(null, file);
		var customFile = theme + "/" + path.basename(file.path)
				.replace(new RegExp(path.extname(file.path) + "$"), ".jade");

		if (fs.existsSync(customFile)) {
			templateFile = customFile;
		} else {
			templateFile = theme + "/index.jade";
		}

		var html = String(file.contents);
		var template = fs.readFileSync(templateFile).toString();
		var compile = jade.compile(template, { pretty: true, filename: templateFile });
		file.contents = new Buffer(compile({ content: html, dir: file.dir || "" }));
		done(null, file);
	}, function(done) {
		var files = fs.readdirSync(theme + "/files");

		files.forEach(function(file) {
			this.push(new File({
				path: file,
				contents: fs.readFileSync(theme + "/files/" + file)
			}))
		}.bind(this));
	});
}