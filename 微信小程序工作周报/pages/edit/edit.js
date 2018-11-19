// pages/edit/edit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx: 0,
    userId: '',//获取登录的userid
    userName:'',
    logid:'',
    stype:'description',
    description:'',//输入的工作内容
    topList:[
      {"title":"工作内容","id":"description"},
      {"title":"下周计划","id":"plan"},
      {"title":"意见与建议","id":"advise"}
      ],
      contentList:[],
    textvalue:'',
    userInfo:{}
      
  },
  //根据类型获取列表
  getListByStype:function(logid,stype,that){
    wx.request({
      url: app.globalData.ip+'api/user/getListByStype?logid='+logid+"&stype="+stype,
      success: function (res) {
        that.setData({
          contentList:res.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //切换类型
  goTopIndex:function(e){
    let index = e.currentTarget.dataset.index; 
    let stype=e.currentTarget.dataset.id;
    this.setData({
      idx: index,
      stype: stype
    })
    var that = this;
    this.getListByStype(this.data.logid, this.data.stype,this)
  },
  getDes:function(e){
    this.data.description = e.detail.value;
  },
  //删除
  delete:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    wx.showLoading({
      title:"删除中...",
      mask:true
    })
    wx.request({
        url:app.globalData.ip+"api/user/delete?id="+id,
        success:function(){
          that.getListByStype(that.data.logid, that.data.stype,that)
          wx.hideLoading();
        }
    })
  },
  createLogs: function (userId,taskId){
    wx.request({
      url: app.globalData.ip +'api/user/createLogs?userId='+userId+'&taskId='+taskId,
      success:function(res){
      }
    })
  },
  //保存
  save:function(e){
    var that=this;
    let stype = this.data.stype;
    let userid = this.data.userId;
    let des=this.data.description;
    let logid=this.data.logid;
    if(des==""){
      wx.showModal({
        title:"提示",
        content:"内容不能为空"
      })
    }else{
      wx.showLoading({
        title: "保存中...",
        mask:true
      })
      wx.request({
        url: app.globalData.ip+'api/user/save?userid='+userid,
        method:'POST',
        data:{
          "log":logid,
          "description":des,
          "stype":stype,
        },
        success:function(res){
          that.setData({
            textvalue:''
          })
          that.getListByStype(that.data.logid, that.data.stype,that)
          wx.hideLoading();
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId:app.globalData.userId,
      userName:options.username,
      logid:options.logid,
      userInfo:app.globalData.userInfo.avatarUrl
    })
    this.createLogs(app.globalData.userId, app.globalData.taskId);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getListByStype(this.data.logid, this.data.stype,this)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
