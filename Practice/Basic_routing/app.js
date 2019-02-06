var http= require('http');
var fs = require('fs');

var server=http.createServer(function (req,res) {
	// body...
    console.log('Request was made'+req.url);
     if(req.url==='/home'|| req.url==='/' )
     {
        res.writeHead(200,{'Content-Type':'text/html'});
       fs.createReadStream(__dirname+'/index.html').pipe(res);

     }
     else if(req.url==='/contact')
     {
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.createReadStream(__dirname+'/contact.html').pipe(res);
     }
     else if(req.url==='/node/api')
     {
         var myObj=[
             {
            name: 'John',
            job:'web dev',
            age:'22' 
             },
            {
                name: 'Rick',
                job:'DevOPs',
                age:'22'      
            }];
        res.writeHead(200,{'Content-Type':'application/JSON'});
       res.end(JSON.stringify(myObj));
     }
     else 
     {
        res.writeHead(404,{'Content-Type':'text/html'});
        fs.createReadStream(__dirname+'/404.html').pipe(res);
     } 

	
});
server.listen(3000,'127.0.0.1');
console.log("Server listening to port 3000");
