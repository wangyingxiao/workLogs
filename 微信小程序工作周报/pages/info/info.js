// pages/info/info.js
const app = getApp();
Page({

  /*{{】}}
   * 页面的初始数据
   */
  data: {
    desList: [{ description: '暂无' }],
    planList: [{ description: '暂无' }],
    adviseList: [{ description: '暂无' }],
    userName:'',
    grade:0,
    gradeDes:'',
    userInfo:'',
    userImage:''
  },
  getDesList: function (logid) {
    var that = this;
    wx.request({
      url: app.globalData.ip + 'api/user/getListByStype?logid=' + logid + '&stype=description',
      success: function (res) {
        console.log(res);
        if(res.data.length!=0){
          that.setData({
            desList: res.data
          })
        }
       
        console.log(that.data.desList)
      }
    })
  },
  getPlanList: function (logid) {
    var that = this;
    wx.request({
      url: app.globalData.ip + 'api/user/getListByStype?logid=' + logid + '&stype=plan',
      success: function (res) {     
        if(res.data.length!=0){
          that.setData({
            planList: res.data
          })
        }      
      }
    })
  },
  getAdviceList: function (logid) {
    var that = this;
    wx.request({
      url: app.globalData.ip + 'api/user/getListByStype?logid=' + logid + '&stype=advise',
      success: function (res) {
        if(res.data.length!=0){
          that.setData({
            adviseList: res.data
          })
        }
       
      }
    })
  },
  //获取评价
  getGradeDes:function(star){
    var that=this;
    wx.request({
        url:app.globalData.ip +"api/user/gradeDes?star="+star,
        success:res=>{
            console.log(res)
          that.setData({
            gradeDes:res.data.description
          })
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      userName:options.username,
      grade:parseInt(options.grade),
      userInfo:app.globalData.userInfo.avatarUrl,
      userImage:options.userImage
    })
    this.getDesList(options.logid);
    this.getPlanList(options.logid);
    this.getAdviceList(options.logid);
    this.getGradeDes(this.data.grade)
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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