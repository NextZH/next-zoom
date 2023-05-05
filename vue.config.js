module.exports={
  //打开vue官网 vue cli查看vue.config.js配置。
  //vue脚手架全部打包好了，你想要啥东西都可以在这里配置，不能直接里面配置
  lintOnSave:false,//关闭语法检查

  //跨域的两种写法
  //第一种是这样的，只能跨一个域，
  //而且同源下若是有一个同名文件，就先跨域到本文件下的文件那里去
//   devServer:{
//       proxy:'https://tianqi.2345.com'
//   }

  //第二种方法，可以跨很多域
//   devServer:{
//       proxy:{
//           '/api':{
//               target:'http://127.0.0.1:3333',//你要跨域的服务器
//               changeOrigin: true, // 允许跨域
//               pathRewrite:{'^/api':''},//位置替换，把请求的/api换为空
//               //正则表达式，/api变为空字符串
//               //由于前面写http://localhost:8081/api/hello
//               //传到服务器是/api/hello，不是/hello
//               //所以现在将/many去掉
              
//           },
//           'aaa':{
//               target:'http://Other'
//           }
//       }
//   }
}