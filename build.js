var through = require("through2"),
	fs = require("vinyl-fs"),
	File = require("vinyl");

var args = require("yargs").argv;

var files = args._;

var plugins = {
	$: require("./plugins/cheerio"),
	html: require("./plugins/html"),
	theme: require("./plugins/theme"),
	localImages: require("./plugins/local-images"),
	concat: require("./plugins/concat"),
	autodir: require("./plugins/autodir")
}

fs.src(files)
  .pipe(plugins.html())
  .pipe(plugins.$())
  .pipe(plugins.autodir({ prefer: "rtl" }))
  .pipe(plugins.localImages())
  .pipe(plugins.theme("./themes/thesis"))
  .pipe(fs.dest(args.o || "."));