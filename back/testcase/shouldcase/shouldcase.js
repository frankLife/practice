var should = require('should');
var calculator = require('./calculator');

var tax = 0.12;
var tip = 0.15;
var prices = [10,20];

var pricesWithTaxNTip = calculator.addPercentageToEach(prices,tax + tip);
pricesWithTaxNTip[0].should.equal(12.7);
pricesWithTaxNTip[1].should.equal(25.4);

var sumPrice = calculator.sum(pricesWithTaxNTip);
// console.log(typeof sumPrice.toFixed(2));
sumPrice.toFixed(2).should.equal('38.10');

calculator.dollarFormat(sumPrice).should.equal('$38.10');
calculator.percentFormat(tax).should.equal('12%');