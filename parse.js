'use strict';

function fill(n, c) {
  var str = '';
  for (var i = 0; i < n; i++) {
    str = str + c;
  }
  return str;
}

let starsToHashes = (() => {
  let result = {};
  for (let num of [1,2,3,4,5,6]) {
    result[fill(num, '*')] = fill(num, '#');
  }
  return result;
})();

let keywords = {
  'DONE': 'DONE',
  'TODO': 'TODO',
  'INPROGRESS': 'INPROGRESS'
};

function headTail(str) {
  let pieces = str.split(/\s+/);
  let head = pieces.splice(0, 1);
  return [head, pieces.join(' ')]
}

let emphasize = (word) => `*${word}*`;

function invalid() {
  return {
    valid: false
  };
}

function bareText(text) {
  return {
    valid: true,
    text: text
  };
}

function textWithStatus(text, status) {
  return {
    valid: true,
    text: text,
    status: status
  };
}

function parseLine(row) {
  let [stars, rest] = headTail(row.trim());
  var hashes = starsToHashes[stars];
  if (!hashes) { return invalid(); }
  let [keyword, desc] = headTail(rest);
  keyword = keywords[keyword];
  if (!keyword) {
    return bareText(`${hashes} ${rest}`);
  } else {
    return textWithStatus(`${hashes} ${emphasize(keyword)} ${desc}`, keyword);
  }
}

function parse(orgText) {
  return orgText
      .split('\n')
      .filter(line => line.trim() != '')
      .map(parseLine);
}

module.exports = parse;
