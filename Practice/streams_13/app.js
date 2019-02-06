var http=require('http');
var fs=require('fs');

// var myReadStream = fs.createReadStream(__dirname+'/readMe.txt','utf8');
// var myWriteStream = fs.createWriteStream(__dirname+'/writeMe.txt');


// myReadStream.on('data',function(chunk){
// 	console.log('new chunk received:');
// 	myWriteStream.write(chunk);
	
// });

//// USING PIPE
//myReadStream.pipe(myWriteStream);


// STREAM ON SERVER
var server=http.createServer(function (req,res) {
	// body...
	console.log('Request was made'+req.url);
	res.writeHead(200,{'Content-Type':'text/plain'});
	var myReadStream = fs.createReadStream(__dirname+'/readMe.txt','utf8');
	myReadStream.pipe(res);
	//res.end('Hey fellas');
});

server.listen(3000,'127.0.0.1');
console.log("Server listening to port 3000");
