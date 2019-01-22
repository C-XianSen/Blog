// 应用程序的启动入口文件

var express = require('express');  // 加载express模块
var swig = require('swig'); // 1.加载模板处理模块
var app = express();  // 创建app应用,相当于nodeJS的http。createService()


// 2.配置模板应用模块
//   定义当前应用所使用的模板引擎,第一个参数：模板引擎名称,同时也是模板文件的后缀;第二个参数：解析处理模板内容的方法
app.engine('html', swig.renderFile);
//   设置模板文件存放的目录,第一个参数必须是views,第二个参数是目录
app.set('views', './views');
//   注册模板,第一个参数：必须是view engine,第二个参数与定义模板引擎的第一个参数名称一致
app.set('view engine', 'html')
//   第一次读取会把模板缓存到内存当中,下次会直接读取,因此即使改了模板内容刷新也不会有变化,需要在开发过程中取消模板缓存
swig.setDefaults({cache: false});

// 设置静态文件托管
// 托管规则：用户发送http请求到后端,后端解析url,找到匹配规则,执行绑定的函数,返回对应的内容,静态文件直接读取知道目录下文件返回给用户,动态文件:处理业务逻辑,加载模板,解析模板返回上数据
app.use('/public', express.static(__dirname + '/public'));  // 当用户请求的路径url以/public开头时,以第二个参数的方式进行处理(直接返回__durname + '/public'目录下的文件)

/**
 * @description: 给app绑定首页路由,把一个url路径通过一个或多个方法绑定
 * @param {type} req  request对象,保存客户端请求相关的一些数据
 * @param {type} res  response对象
 * @param {type} next  函数,用于执行下一个和当前路径相匹配的函数
 * @return: 
 */
app.get('/', function (req, res, next) {
  // 读取views目录下的指定文件,解析并返回给客户端,第一个参数：模板名称相对于views/index.html,第二个参数：传递给模板使用的数据
  res.render('index');
})

// 静态文件托管,这种写法不使用
// app.get('/main.css', function (req, res, next) {
//   res.setHeader('content-type', 'text/css');  // 设置内容类型,默认以字符串方式访问
//   res.send('body {color: red}');  // 字符串形式的css内容
// })

// 监听http请求
app.listen(8080);

