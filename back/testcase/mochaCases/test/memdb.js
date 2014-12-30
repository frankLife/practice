var memdb = require('../mochaCase');
var assert = require('assert');

describe('memdb',function(){
  describe('.save(doc)',function(){
    it('should save the document',function(){
      var pet = {name: 'frank'};
      memdb.save(pet);
      assert.ok(pet == memdb.first({name: 'frank'}));
    });
  });
});