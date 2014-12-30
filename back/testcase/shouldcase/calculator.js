exports.addPercentageToEach = function(prices,percentage){
  return prices.map(function(price){
    price = parseFloat(price);
    return price * (1 + percentage);
  });
}

exports.sum = function(prices){
  return prices.reduce(function(sum,val){
   return  parseFloat(sum) + parseFloat(val);
  });
}
exports.dollarFormat = function(price) {
  return '$' + parseFloat(price).toFixed(2);
}
exports.percentFormat = function(percentage) {
  return parseFloat(percentage).toFixed(2)*100 +'%'
}