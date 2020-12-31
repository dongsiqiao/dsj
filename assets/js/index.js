$(function () {
  getUserInfo()
  var layer = layui.layer
  $('#btnLogout').on('click', function () {
    layer.confirm(
      '确定退出登录？',
      {
        icon: 3,
        title: '提示'
      },
      function (index) {
        // 1. 清空本地 token
        localStorage.removeItem('token')
        // 2. 跳转到登录页
        location.href = '/login.html'
        // 3. 关闭确认框
        layer.close(index)
      }
    )
  })
})
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //     Authorization: localStorage.getItem('token') || ''
    // },
    success(res) {
      if (res.status !== 0) {
        return layui.layui.msg('获取信息失败')
      }
      renderAvatar(res.data)
    }
    //   complete: function (res) {
    //     // 成功 or 失败都会执行这里
    //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
    //         // 1. 清空 token
    //         localStorage.removeItem('token');
    //         // 2. 强制跳转到登录页
    //         location.href = '/login.html';
    //     }
    // }
  })
}
function renderAvatar(user) {
  let name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;' + name)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
