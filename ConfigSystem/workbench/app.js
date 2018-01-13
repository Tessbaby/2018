//app.js
var that

App({
  onLaunch: function (options) {
    that = this
  
  },
  globalData: {
    userInfo: null
  },
  user:{},
  http: function (port) {
    var http = "http://192.168.1.210" + ":" + port
    var https = "https://api.haochepaidui.com"
    return http
  },
  wss:function(port){
    var wsstest="wss://localhost:"+port
    var wss = "wss://api.haochepaidui.com" 
    return wss
  },
  appid: "wxae06df64733ad5cf",
  appSecret: "ebf14dc092ae5289df439c2fdffb8ea0",
  
})