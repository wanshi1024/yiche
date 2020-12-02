
//获取当前页所有点评数组
var showConts = document.querySelectorAll('.show-cont');

//遍历当前页面的点评
showConts.forEach(item => {
    //获取每条点评的加精按钮
    let jj = item.querySelector(' div.titlelist > ul > li.f_r > div > div:nth-child(1) > button:nth-child(2)');
    //加精按钮点击事件
    jj.onclick = () => {
        //1s后自动触发确认按钮点击事件
        setTimeout(() => {
            document.querySelector('body > div.el-message-box__wrapper > div > div.el-message-box__btns > button.el-button.el-button--default.el-button--small.el-button--primary').click();
        }, 500);
    }
})