var tobi = require('tobi');
var browser = tobi.createBrowser(3000,'127.0.0.1');
browser.get('/', function(res, $){ 
    $('form')
      .fill({ 
        date: '2015-01-04',
        hours: 20,
        description: 'xx'
       }) 
      .submit(function(res, $) { 
        console.log('request!');
        $('ul')
          .html()
          .indexOf('Floss the cat')
          .should.not.equal(-1);
      });
});
