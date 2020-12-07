document.body.style.userSelect = 'none';
document.querySelector('.w450').style.display = 'none';
document.querySelector('.header').style.display = "none";
document.body.style.background = '#DFE6C7';
window.onbeforeunload = () => confirm('确认离开吗?');
var showConts;
if (showConts == null || showConts == undefined) {
    showConts = document.querySelectorAll('.show-cont');
}

function uidMark() {
    let carTextArr = ['昂科旗', '名爵', '奕炫', '开拓者', '科鲁泽', '昂科威S', '宋Pro', '风神AX7', '迈锐宝XL'];
    setTimeout(() => {
        for (let i = 0; i < showConts.length; i++) {
            // 标记文字内容颜色问题
            let uidDom = showConts[i].querySelector('div.titlelist > ul > li.three > span:nth-child(1)');
            let contTextDom = showConts[i].querySelector('.cont_text');
            let str = contTextDom.innerHTML;
            if (str.length < 350) uidDom.style.border = '1px red solid';
            else uidDom.style.border = 'none';
            let wg = '#外观';
            let ns = '#内饰';
            let se = '色';
            if (str.indexOf(se) != -1) uidDom.style.color = 'skyblue';
            else uidDom.style.color = '#606266';
            str = str.replace(new RegExp(se, 'gm'), `<mark><b>${se}</b></mark>`);
            str = str.replace(wg, `<mark><b>${wg}</b></mark>`);
            str = str.replace(ns, `<mark><b>${ns}</b></mark>`);
            contTextDom.innerHTML = str;

            //标记不加精车型
            let carModelDOM = showConts[i].querySelector('ul > li:nth-child(2)');
            let tempText = carModelDOM.innerText;
            let isBuJiaJing = carTextArr.some(item => tempText.indexOf(item) != -1)
            if (isBuJiaJing) carModelDOM.style.color = 'red';
            else carModelDOM.style.color = '#606266';

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
        }
    }, 2000);
}

document.querySelectorAll('.pages')[1].onclick = () => {
    scrollTo(0, 0);
    uidMark();
}
document.querySelectorAll('.pages')[0].onclick = () => {
    scrollTo(0, 0);
    uidMark();
}

for (let i = 0; i < showConts.length; i++) {

    // 编辑按钮设置禁用
    showConts[i].querySelectorAll('.btn-warp')[1].querySelector('button').disabled = true;
    // 隐藏按钮
    let elemSelectorArr = ['li:nth-child(2) > a:nth-child(1)',
        'li:nth-child(2) > a:nth-child(2)',
        'li.three > span:nth-child(2) > button',
        'li.f_r > div > div:nth-child(3) > button:nth-child(1)',
        'li.f_r > div > div:nth-child(3) > button:nth-child(2)',
        'li.f_r > div > div:nth-child(3) > button:nth-child(3)',
        'li.f_r > div > div:nth-child(2) > button'
    ];
    elemSelectorArr.forEach(v => showConts[i].querySelector(` div.titlelist > ul >${v}`).style.display = 'none');

    // 点评文字内容的显示和隐藏
    let contTextDom = showConts[i].querySelector('.cont_text');
    contTextDom.style.display = 'none';

    let ipDom = showConts[i].querySelector('div.manage_info > span:nth-child(4)');
    ipDom.style.cursor = 'pointer';
    ipDom.style.background = '#fff';
    ipDom.onclick = () => contTextDom.style.display = 'block';

    let zuihoufabiaoshijian = showConts[i].querySelector('div.manage_info > span:nth-child(3)');
    zuihoufabiaoshijian.style.cursor = 'pointer';
    zuihoufabiaoshijian.style.background = '#fff';
    zuihoufabiaoshijian.onclick = () => contTextDom.style.display = 'none';


    // 查询车牌
    let buyCarAddrDOM = showConts[i].querySelector('ul > li:nth-child(3) > p:nth-child(2)');
    buyCarAddrDOM.style.cursor = 'pointer';
    buyCarAddrDOM.onclick = () => window.open(`https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${buyCarAddrDOM.innerText.trim()}车牌`)

    // 复制车型
    let carModelDOM = showConts[i].querySelector('ul > li:nth-child(2)');
    carModelDOM.style.cursor = 'pointer';
    carModelDOM.style.background = '#DFE6C7';
    carModelDOM.onclick = function() {
        let arr = carModelDOM.innerText.split(' '),
            str = '';
        if (arr.length == 3) {
            str = arr[0] + " " + arr[1]
        } else {
            str = arr.join(' ')
        }
        copy(str)
    }

    //复制点评id
    let reviewIdDom = showConts[i].querySelector('div.manage_info > span:nth-child(1)');
    reviewIdDom.onclick = () => copy(reviewIdDom.innerText.replace('点评ID：', ''))
    reviewIdDom.style.cursor = 'pointer';
    reviewIdDom.style.background = '#fff';

    // 复制完整车型
    let titleDOM = showConts[i].querySelector(".tit-box");
    titleDOM.style.cursor = 'pointer';
    titleDOM.style.background = '#DFE6C7';
    titleDOM.onclick = function() {
            let str = this.innerText;
            let index = str.indexOf('款');
            let arr = str.split('');
            str = '';
            for (let k = index + 1; k < arr.length; k++) str += arr[k];
            copy(str);
            localStorage.setItem("titleStr", this.innerText);
            /***********************************************/
            let baseURL = `http://ms.yiche.com/koubeiapi/api/admin/getAllTopicListByMoreCondition?topicId=${reviewIdDom.innerText.replace('点评ID：', '')}`;
            Ajax.get(baseURL, res => {
                res = JSON.parse(res);
                console.log(res);
                let carId = res.data.result[0].carInfo.carBaseInfos.carId;
                let carSpell = res.data.result[0].carInfo.allSpell;
                let targetURL_carMsg = `http://car.bitauto.com/${carSpell}/m${carId}`; // 这是打开车型信息页面
                let targetURL_carImg = `http://photo.bitauto.com/sumphoto/style_${carId}`; //这是打开车型图片页面
                localStorage.setItem('targetURL_carMsg', targetURL_carMsg);
                localStorage.setItem('targetURL_carImg', targetURL_carImg);
            })

        }
        // 复制发表时间
    let publishTimeDOM = showConts[i].querySelector('div.manage_info > span:nth-child(2)');
    publishTimeDOM.onclick = () => copy(publishTimeDOM.innerText)
    publishTimeDOM.style.cursor = 'pointer';
    publishTimeDOM.style.background = '#fff';

    // 复制用户名 + uuid
    let usernameAndUuid = showConts[i].querySelector('div.titlelist > ul > li.three > span:nth-child(1)');
    usernameAndUuid.onclick = () => copy(usernameAndUuid.innerText);
    usernameAndUuid.style.cursor = 'pointer';
    usernameAndUuid.style.background = '#DFE6C7';

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


}



/**
 * 复制字符串到剪贴板的函数
 * @param {String} value 需要被复制的字符串
 * @returns {Boolean} 操作结果
 */
function copy(value) {
    console.log(value);
    var currentFocus = document.activeElement; // 保存当前活动节点
    let input = document.createElement('input'); // 创建一个input标签
    document.body.appendChild(input); // 把标签添加给body
    input.style.opacity = 0; //设置input标签设置为透明(不可见)
    input.value = value; // 把需要复制的值放到input上
    // 记录当前滚动位置, 因为添加节点并选中的时候回影响页面滚动
    let scrollY = window.scrollY;
    input.focus(); // input节点获取焦点
    input.setSelectionRange(0, input.value.length); // 选中input框中的所有文字
    var res = document.execCommand('copy', true); // 复制文字并获取结果
    currentFocus.focus(); // 之前活动节点获得焦点
    document.body.removeChild(input); // 删除添加的input节点
    // 页面滚动到之前位置
    window.scrollTo(0, scrollY);
    promptBox('复制成功')
    return res; // 返回操作结果
}
/**
 * 
 * @param {*} str 
 */
function promptBox(str) {
    let pb = document.createElement('div');
    pb.innerHTML = str;
    let cssObj = {
        position: 'fixed',
        left: '50%',
        top: '0%',
        border: '1px solid #EBEEF5',
        padding: '15px 15px 15px 20px',
        background: '#f0f9eb',
        color: '#67C23A',
        opacity: 0,
        transition: 'all 1s'
    };
    for (let key in cssObj) {
        pb.style[key] = cssObj[key];
    }
    pb.id = 'ws';
    document.body.append(pb);
    setTimeout(() => {
        pb.style.top = '10%';
        pb.style.opacity = 1;
        setTimeout(() => {
            pb.remove()
        }, 2000);
    }, 50);

}

document.onkeydown = function(e) {
    e = window.event || e;
    var k = e.keyCode;
    //屏蔽ctrl+R，F5键，ctrl+F5键  F3键！验证
    if ((e.ctrlKey == true && k == 82) || (k == 116) ||
        (e.ctrlKey == true && k == 116) || k == 114) {
        // e.keyCode = 0;
        e.returnValue = false;
        e.cancelBubble = true;
        alert(`误触了f5了吗?`)
        return false;
    }
}

if (document.querySelector('#_div') == null) {
    let _div = document.createElement('div');
    _div.id = "_div";
    _div.style.width = '25px';
    _div.style.height = '50px';
    _div.style.background = '#19be6b';
    _div.style.position = 'fixed';
    _div.style.bottom = '40%';
    _div.style.left = '0';
    _div.style.cursor = 'pointer'
    document.body.appendChild(_div);
    _div.onclick = (e) => uidMark();
}

var Ajax = {
    get: function(url, fn) {
        // XMLHttpRequest对象用于在后台与服务器交换数据   
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 从服务器获得数据 
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send();
    },
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function(url, data, fn) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        // 添加http头，发送信息至服务器时内容编码类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send(data);
    }
}