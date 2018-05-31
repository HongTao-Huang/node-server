var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

// var server = http.createServer(function(request, response){
//   var parsedUrl = url.parse(request.url, true)
//   var path = request.url
//   var query = ''
//   if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
//   var pathNoQuery = parsedUrl.pathname
//   var queryObject = parsedUrl.query
//   var method = request.method

var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method






  /******** 从这里开始看，上面不要看 ************/
  console.log('HTTP 路径为\n' + path);
  if(path === '/ajax'){
      response.setHeader('Content-Type', 'text/json; charset=utf-8');
      response.setHeader('Access-Control-Allow-Origin','*');
      response.statusCode = 200;
      response.write(`
      {
          "黄洪涛":{
            "age": "18",
            "sex": "男"
          }
      }
      `);
      response.end();
  }
    /******************************JSONP  学习代码*******************************************************/
    else if(path === '/hht'){
        response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
        response.statusCode = 200;
        response.write(`${query.callback}.call(undefined,'success')`);
        response.end();
    }
    /***************第一次node server程序*****************************/
    else if(path === '/style.css'){
      let string = fs.readFileSync('./style.css', 'utf8')
    response.setHeader('Content-Type', 'text/css; charset=utf-8');
    response.write(string);
    response.end()
  }else if(path === '/main.js'){
      let string = fs.readFileSync('./main.js', 'utf8')
      response.statusCode = 200
      response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
      response.write(string)
      response.end()
  }else if(path === '/'){
      let string = fs.readFileSync('./index.html', 'utf8')
      response.statusCode = 200
      response.setHeader('Content-Type', 'text/html;charset=utf-8')
      response.write(string)
      response.end()
  }
  else{
    response.statusCode = 404;
    response.end()
  }



  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)