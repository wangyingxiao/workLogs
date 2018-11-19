// pages/task/task.js
const app = getApp();
var Api = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    userId: '',//获取登录的userid
    taskList:[],
    model:false,//登录模态框
    inputvalue:''
  },
  getInput:function(e){
    this.setData({
      userId: e.detail.value
    })
  },
  getYes:function(){
    this.setData({
      model: false
    })
    wx.showLoading({title:"加载中..."})
    var userId=this.data.userId;
    var openId=app.globalData.openid;
    this.updateUser(userId, openId)
    this.setData({
      inputvalue:''
    })
  },
  getNo:function(){
    this.setData({
      model:false
    })
  },
  getTaskList: function () {
    var that = this;
    wx.request({
      url: app.globalData.ip+'api/user/taskList',
      success: function (res) {
       
        var datas = res.data;
        for (let i = 0; i < datas.length; i++) {
          datas[i]["time"] = Api.formatTime1(new Date(datas[i]["timestamp"]));
          datas[i]["timestamp"] = Api.formatTime(new Date(datas[i]["timestamp"]))
         
        }
        that.setData({
          taskList:datas
        })
      },
      fail: function (err) {
        console.log(err)
        wx.showModal({
          title: '提示',
          content: '网络请求错误，请稍后重试',
        })
      }
    })
  },
  enterMain:function(e){
    /*更新用户头像 */
    var taskid = e.currentTarget.dataset.taskid;
    app.globalData.taskId = e.currentTarget.dataset.taskid;
    if(app.globalData.userId==""){
      this.setData({
        model:true
      })
    }else{     
      wx.navigateTo({
        url: '/pages/main/main?taskid=' + taskid
      })
    }
    
  },
  delete:function(e){
    var that=this;
    var taskid = e.currentTarget.dataset.taskid;
    wx.request({
      url: app.globalData.ip +'api/user/deleteTask?id='+taskid,
      success:function(res){
        that.getTaskList()
      }
    })
  },
  enterNewTask:function(){
    wx.navigateTo({
      url: '/pages/newTask/newTask'
    })
  },
  updateUser:function(userId,openId){
    var that=this;
    wx.request({
      url: app.globalData.ip +'api/user/updateUser?userId='+userId+'&openId='+openId,
      success:function(res){
        wx.hideLoading();  
        if(res.data.length==0){
          wx.showToast({
            title:'该用户不存在',
            image:"../images/icon-nouser.png",
            duration:2000
          })
          setTimeout(function(){
            that.setData({
                model:true
              })
          },2000)
        }else{
          app.globalData.userId = res.data[0].id;
        }
      }
    })
  },
  getUserByOpenId:function(openId){
    var that=this;
    wx.request({
      url: app.globalData.ip +'api/user/getUserByOpenId?openId='+openId,
      success:function(res){
        if(res.data.length==0){
          that.setData({
            model:true
          })          
        }else{
          app.globalData.userId = res.data[0].id;
          that.setData({
            userId: res.data[0].id
          })
        }
       
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: false
    })
    app.globalData.appInfo = e.detail.userInfo
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
  /******获取用户信息*********/
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log(this.data.userInfo);
    /******************** */
    var that=this;
    this.getTaskList();
    setTimeout(function(){     
      if (that.data.taskList.length == 0) {       
        that.getTaskList();      
      }
    },1000)

    wx.login({  
      success: function (msg) {
        wx.request({
          url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + app.globalData.appid + "&secret=" + app.globalData.secret + "&js_code=" + msg.code + "&grant_type=authorization_code",
          success: function (res) {
            app.globalData.openid = res.data.openid;
            that.getUserByOpenId(res.data.openid)
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
onShow:function(){
  this.getTaskList();
},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})