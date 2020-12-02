var showConts;
if (showConts == null || showConts == undefined) {
    showConts = document.querySelectorAll('.show-cont');
}
for (let i = 0; i < showConts.length; i++) {
    let reviewIdDom = showConts[i].querySelector('div.manage_info > span:nth-child(1)');
    let titleDOM = showConts[i].querySelector(".tit-box");
    titleDOM.onclick = function () {
        let baseURL = `http://ms.yiche.com/koubeiapi/api/admin/getAllTopicListByMoreCondition?topicId=${reviewIdDom.innerText.replace('点评ID：', '')}`;
        Ajax.get(baseURL, res => {
            res = JSON.parse(res);
            // console.log(res);
            let carId = res.data.result[0].carInfo.carBaseInfos.carId;
            let carSpell = res.data.result[0].carInfo.allSpell;
            let targetURL = `http://car.bitauto.com/${carSpell}/m${carId}`;
            window.open(targetURL)
        })

    }
    //获取每条点评的加精按钮
    let jiajingDom = showConts[i].querySelector(' div.titlelist > ul > li.f_r > div > div:nth-child(1) > button:nth-child(2)');
    if (jiajingDom != null) {
        //加精按钮点击事件
        jiajingDom.onclick = () => {
            //0.5s后自动触发确认按钮点击事件
            setTimeout(() => {
                document.querySelector('body > div.el-message-box__wrapper > div > div.el-message-box__btns > button.el-button.el-button--default.el-button--small.el-button--primary').click();
            }, 500);
        }
    }
    /******************************** */
}
/******************************** */
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