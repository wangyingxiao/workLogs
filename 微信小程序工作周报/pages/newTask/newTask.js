// pages/newTask/newTask.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputvalue1:'移动研发组工作周报',
    //inputvalue2:'移动研发组'
  },
save:function(){
  var des=this.data.inputvalue1;
  wx.showLoading({
    title: '创建中...',
  })
  wx.request({
    url: app.globalData.ip +'api/user/createNewTask?des='+des+'&groupId=mobile',
    success:function(res){
        console.log(res);
        wx.hideLoading();
        wx.showToast({
          title:'创建成功'
        })
      wx.reLaunch({
        url: '/pages/task/task'
      })
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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