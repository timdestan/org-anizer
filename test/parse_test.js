'use strict';

let expect = require('chai').expect;
let parse = require('../parse');

describe('parse', () => {
  it('should return empty array for empty input', () => {
    expect(parse('')).to.eql([]);
  });

  it('should transform * to #', () => {
    expect(parse('* Tasks\n  ** Do stuff'))
        .to.eql([{
          valid: true,
          text: '# Tasks'
        },{
          valid: true,
          text: '## Do stuff'
        }]);
  });
});
