var memdb = require('../mochaCase');
var assert = require('assert');

describe('memdb',function(){
  //define a cleanup logic by using beforeEach exposed by mocha
  beforeEach(function(){
    memdb.clear();
  });

  describe('.save(doc)',function(){
    it('should save the document',function(){
      var pet = {name: 'frank'};
      memdb.save(pet);
      assert.ok(pet == memdb.first({name: 'frank'}));
    });
  });

  describe('.first(obj)',function(){
    it('should return the first obj',function(){
      var pet = {name: 'dog'};
      var pet2 = {name: 'pig'};

      memdb.save(pet);
      memdb.save(pet2);
      assert(pet == memdb.first({name:'dog'}));
      assert(pet2 == memdb.first({name: 'pig'}));
    });
    it('shouldn"t return the firts obj',function(){
      assert(null == memdb.first({name:'dolphin'}));
    });
  });

  describe('.doAsyncSave(obj)',function(){
    it('should save asynchronously',function(){
      var pet = {name: 'cat'}
      memdb.doAsyncSave(pet,function(){
        assert(pet == memdb.first({name:'cat'}));
        done();
      })
    })
  });
});