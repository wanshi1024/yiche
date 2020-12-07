
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

/**
 * http://ms.yiche.com/koubeiapi/api/admin/getAllTopicListByMoreCondition?
 * topicId=
 * &userId=
 * &serialId=
 * &trimId=
 * &pageSize=10
 * &pageIndex=1
 * &sTime=2020-12-01%2000%3A00%3A00
 * &eTime=2020-12-02%2000%3A00%3A00
 * &checkStatus=1
 * &deleteStatus=
 * &isHavePic=1
 * &isHaveVideo=
 * &datatrans=0
 * &userLevel=O
 * &rating=
 * &userName=
 * &dpStatus=
 * &topicType=
 * &isAuthen=
 * &n=32
 */
/**
 * http://ms.yiche.com/koubeiapi/api/admin/getAllTopicListByMoreCondition?topicId=4051373636128384&userId=&serialId=&trimId=&pageSize=10&pageIndex=1&sTime=&eTime=&checkStatus=1&deleteStatus=&isHavePic=&isHaveVideo=&datatrans=0&userLevel=&rating=&userName=&dpStatus=&topicType=&isAuthen=&n=23
 */
var Ajax = {
    get: function (url, fn) {
        // XMLHttpRequest对象用于在后台与服务器交换数据   
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 从服务器获得数据 
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send();
    },
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function (url, data, fn) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        // 添加http头，发送信息至服务器时内容编码类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send(data);
    }
}

/**
 * http://ms.yiche.com/koubeiapi/api/admin/getAllTopicListByMoreCondition?
 * topicId=&userId=
 * &serialId=1660
 * &trimId=142645
 * &pageSize=10
 * &pageIndex=1
 * &sTime=
 * &eTime=
 * &checkStatus=1
 * &deleteStatus=
 * &isHavePic=
 * &isHaveVideo=
 * &datatrans=0
 * &userLevel=
 * &rating=
 * &userName=
 * &dpStatus=
 * &topicType=&isAuthen=&n=59
 */