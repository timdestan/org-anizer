'use strict';

// Make a string by repeating character c n times.
let fillString = (n, c) => Array(n + 1).join(c);

let makeObject = pairs => {
  let result = {};
  for (let [key, value] of pairs) {
    result[key] = value;
  }
  return result;
}

let starsToHashes = makeObject(
  [1,2,3,4,5,6].map(num => [
    fillString(num, '*'),
    fillString(num, '#')
  ]));

let keywords = {
  'DONE': 'DONE',
  'TODO': 'TODO',
  'INPROGRESS': 'INPROGRESS'
};

function splitOnFirstWhitespace(str) {
  let pieces = str.split(/\s+/);
  let head = pieces.splice(0, 1);
  return [head, pieces.join(' ')]
}

let emphasize = (word) => `*${word}*`;

function Invalid() {
  return {
    valid: false
  };
}

function BareText(text) {
  return {
    valid: true,
    text: text
  };
}

function TextWithStatus(text, status) {
  return {
    valid: true,
    text: text,
    status: status
  };
}

function parseLine(row) {
  let [stars, rest] = splitOnFirstWhitespace(row.trim());
  var hashes = starsToHashes[stars];
  if (!hashes) { return Invalid(); }
  let [keyword, desc] = splitOnFirstWhitespace(rest);
  keyword = keywords[keyword];
  if (!keyword) {
    return BareText(`${hashes} ${rest}`);
  } else {
    return TextWithStatus(`${hashes} ${emphasize(keyword)} ${desc}`, keyword);
  }
}

let nonEmpty = line => line.trim() != '';

function parse(orgText) {
  return orgText
      .split('\n')
      .filter(nonEmpty)
      .map(parseLine);
}

module.exports = parse;
