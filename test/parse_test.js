'use strict';

let expect = require('chai').expect;
let parse = require('../parse');

describe('parse', () => {
  it('should return empty array for empty input', () => {
    expect(parse('')).to.eql([]);
  });

  it('should transform * to #', () => {
    expect(parse(`* Tasks
                  ** Do stuff`))
        .to.eql([{
          valid: true,
          text: '# Tasks'
        },{
          valid: true,
          text: '## Do stuff'
        }]);
  });

  it('should parse and emphasize statuses', () => {
    expect(parse(`* A
                  ** DONE B
                  ** TODO C`))
          .to.eql([{
            valid: true,
            text: '# A'
          }, {
            valid: true,
            text: '## *DONE* B',
            status: 'DONE'
          }, {
            valid: true,
            text: '## *TODO* C',
            status: 'TODO'
          }]);
  });
});
