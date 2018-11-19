// pages/main1.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',//获取登录的userid
    userList:[], 
    desList:[],//工作内容
    planList:[],//下周计划
    adviseList:[],//建议
    taskId:'',
    logid:'',//由taskid和userid组成
    n3:3
  },

//事件处理函数
  getUserList: function (taskId) {
    var that=this;
    wx.request({
      url: app.globalData.ip+'api/user/userList?taskId='+taskId,
      success: function (res) {  
        for(var i=0;i<res.data.length;i++){
          if(res.data[i].image=='image'){
            res.data[i].image ='../images/user2.png'
          }
        }
        that.setData({         
          userList:res.data
        })
        console.log(that.data.userList);
        wx.hideLoading();
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
//点击进入info页面
enterInfo:function(e){
  var userid = e.currentTarget.dataset.id; 
  var logid=this.data.taskId+userid;
  var username = e.currentTarget.dataset.name; 
  var grade = e.currentTarget.dataset.grade; 
  if (grade!=0){
    wx.navigateTo({
      url: "/pages/info/info?logid=" + logid + "&username=" + username + "&grade=" + grade + '&userImage=' + e.currentTarget.dataset.image
    })
  }
 
},
  //点击进入日志编辑页面
  enterEdit:function(e){
     
     var userid= e.currentTarget.dataset.id; 
     var username=e.currentTarget.dataset.name;
     if(this.data.userId==userid){
       wx.navigateTo({
         url: '/pages/edit/edit?userId='+ userid+"&logid="+this.data.logid+"&username="+username
       })
     }
  },
  //更新头像
  updateImage:function(userId){
    var imageUrl=app.globalData.userInfo.avatarUrl;
    wx.request({
        url:app.globalData.ip+"api/user/updateUserImage?userId="+userId+"&imageUrl="+imageUrl,
        success:res=>{
         
        }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
   this.getUserList(this.data.taskId);
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中...',
    })
    console.log(options);
    this.setData({
      userId: app.globalData.userId,
      taskId: options.taskid,
      logid: options.taskid + app.globalData.userId,
    })

    this.updateImage(this.data.userId)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserList(this.data.taskId);
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