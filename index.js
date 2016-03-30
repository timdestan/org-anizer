'use strict';

let parse = require('./parse');

function transform(input) {
  return parse(input)
    .filter(obj => obj.valid)
    .filter(obj => !obj.status || obj.status == 'DONE')
    .map(obj => obj.text)
    .join('\n');
}

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  var data = process.stdin.read();
  if (data) {
    console.log(transform(data));
  }
});
