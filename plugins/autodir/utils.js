var countMatches, guessDir, isLTR, isRTL, sanitizeText;

sanitizeText = function(text) {
  return text.replace(/@\w+/, '');
};

countMatches = function(text, match) {
  var matches;
  matches = text.match(new RegExp(match, 'g'));
  if (matches) {
    return matches.length;
  } else {
    return 0;
  }
};

isRTL = function(text) {
  var count_rtl;
  text = sanitizeText(text);
  count_rtl = countMatches(text, '[\\u060C-\\u06FE\\uFB50-\\uFEFC]');
  return count_rtl * 100 / text.length > 5;
};

isLTR = function(text) {
  var count_ltr;
  text = sanitizeText(text);
  count_ltr = countMatches(text, '[^\\u060C-\\u06FE\\uFB50-\\uFEFC]');
  return count_ltr * 100 / text.length > 80;
};

guessDir = function(text, fallback) {
  if (fallback == null) {
    fallback = 'ltr';
  }
  if (isRTL(text)) {
    return 'rtl';
  }
  if (isLTR(text)) {
    return 'ltr';
  }
  return fallback;
};

module.exports = {
  isRTL: isRTL,
  isLTR: isLTR,
  guessDir: guessDir
};