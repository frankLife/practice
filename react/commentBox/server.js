var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyparser = require('body-parser')
var app = express();

app.set('port',3001);

app.use(express.static(path.join(__dirname,'lib')));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.get('/comments.json',function(req,res,next){
	var file = fs.readFileSync('./comments.json');
	var commentsObj = JSON.parse(file.toString());
	res.json(commentsObj);
	// res.end();
})
app.post('/comments.json',function(req,res,next){
	fs.writeFile('./comments.json', JSON.stringify(req.body.data,null,4), function(err){
		if(err) {
			res.json({success:false});
			return;
		}
		res.json({success:true});
	});
});
app.listen(app.get('port'),function(){
	console.log('listen on '+ app.get('port'));
})


