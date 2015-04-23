#!/usr/bin/env node
var through = require("through2"),
	fs = require("vinyl-fs"),
	File = require("vinyl");

var args = require("yargs").argv;

var files = args._;

if (!args.theme) {
	throw new Error("No theme specified");
}

var plugins = {
	$: require(__dirname + "/../plugins/cheerio"),
	html: require(__dirname + "/../plugins/html"),
	theme: require(__dirname + "/../plugins/theme"),
	localImages: require(__dirname + "/../plugins/local-images"),
	concat: require(__dirname + "/../plugins/concat"),
	autodir: require(__dirname + "/../plugins/autodir")
}

fs.src(files)
  .pipe(plugins.html())
  .pipe(plugins.$())
  .pipe(plugins.autodir({ prefer: "rtl" }))
  .pipe(plugins.localImages())
  .pipe(plugins.theme(__dirname + "/../themes/" + args.theme))
  .pipe(fs.dest(args.o || "."));