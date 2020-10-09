document.body.style.userSelect = "none";
document.body.style.backgroundColor = "#E2E7D1";
var showConts = document.querySelectorAll('.show-cont');
window.onbeforeunload = (e) => {
    return confirm('确认离开吗?');
}

function uidMark() {
    setTimeout(() => {
        for (let i = 0; i < showConts.length; i++) {
            // 标记uid
            let uidDom = showConts[i].querySelector('div.titlelist > ul > li.three > span:nth-child(1)');
            let uStr = uidDom.innerText.trim();
            let uidNum = uStr.substring(uStr.indexOf('（') + 1, uStr.length - 1);
            let uidArr = [`56`, `57`, `58`, `59`, `62`, `78`, `82`, `87`,`93`];
            let uidFlag = uidArr.some(v => uidNum.substr(0, 2) == v);
            if (!uidFlag) {
                uidDom.style.color = '#606266'
            } else {
                uidDom.style.color = '#f1e10a'
            }

            // 标记重点重复车型
            let carModelDOM = showConts[i].querySelector('ul > li:nth-child(2)');
            let arr = carModelDOM.innerText.split(' '),
                str = '';
            if (arr.length == 3) {
                str = arr[0] + " " + arr[1]
            } else {
                str = arr.join(' ')
            }
            let carModelArr = [
                '昂科旗',
                '名爵6',
                '奕炫',
                '开拓者',
                '昂科威S',
                '宋Pro',
                '风神AX7'];
            let carModelFlag = carModelArr.some(v => v == str);
            if (carModelFlag) {
                carModelDOM.style.backgroundColor = 'pink'
            } else {
                carModelDOM.style.backgroundColor = '#E2E7D1'
            }


            //  查找竞品文字 竞品文字有 <b>${jpNum}</b> 条点评
            // let jpNum = 0;
            // let contTextDom = showConts[i].querySelector('.cont_text');
            // let ipDom = showConts[i].querySelector('div.manage_info > span:nth-child(4)');
            // ipDom.style.backgroundColor = `white`;
            // let textArr = ['汽车之家', '懂车帝', '爱卡汽车', '瓜子网', '人人车'];
            // for (let i = 0; i < textArr.length; i++) {
            //     let str = contTextDom.innerHTML;
            //     let index = str.indexOf(textArr[i]);
            //     if (index != -1) {
            //         console.log(textArr[i]);
            //         str = str.replace(textArr[i], `<mark><b>${textArr[i]}</b></mark>`);
            //         contTextDom.innerHTML = str;
            //         ipDom.style.backgroundColor = `yellow`;
            //         jpNum++;
            //         break;
            //     }
            // }
        }
        promptBox(`已标注uid`);
    }, 2000);
}

document.querySelectorAll('.pages')[1].onclick = () => {
    scrollTo(0, 900);
    uidMark();
}
document.querySelectorAll('.pages')[0].onclick = () => {
    scrollTo(0, 900);
    uidMark();
}

var n = 1; // 1 完整标题  0 截取的标题
for (let i = 0; i < showConts.length; i++) {

    // 编辑按钮设置禁用
    showConts[i].querySelectorAll('.btn-warp')[1].querySelector('button').disabled = true;
    // 隐藏按钮
    let elemSelectorArr = ['li:nth-child(2) > a:nth-child(1)',
        'li:nth-child(2) > a:nth-child(2)',
        'li.three > span:nth-child(2) > button',
        'li.f_r > div > div:nth-child(3) > button:nth-child(1)',
        'li.f_r > div > div:nth-child(3) > button:nth-child(2)',
        'li.f_r > div > div:nth-child(2) > button'
    ];
    elemSelectorArr.forEach(v => showConts[i].querySelector(` div.titlelist > ul >${v}`).style.display = 'none');

    // 点评文字内容的显示和隐藏
    let contTextDom = showConts[i].querySelector('.cont_text');
    contTextDom.style.display = 'none';
    let ipDom = showConts[i].querySelector('div.manage_info > span:nth-child(4)');
    ipDom.style.backgroundColor = 'white';
    ipDom.onclick = () => {
        contTextDom.style.display = 'block';
        setTimeout(() => {
            contTextDom.style.display = 'none';
        }, 2000);
    }

    // 查询车牌
    let buyCarAddrDOM = showConts[i].querySelector('ul > li:nth-child(3) > p:nth-child(2)');
    DomStyle(buyCarAddrDOM);
    buyCarAddrDOM.style.backgroundColor = 'white';
    buyCarAddrDOM.onclick = function () {
        window.open(`https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&ch=4&tn=98010089_dg&wd=${this.innerText.trim()}车牌`);
    }

    // 复制车型
    let carModelDOM = showConts[i].querySelector('ul > li:nth-child(2)');
    DomStyle(carModelDOM);
    carModelDOM.onclick = function () {
        let hrefStr = carModelDOM.querySelector('a').href;
        localStorage.setItem("hrefStr", hrefStr)
        this.style.color = 'red';
        let arr = carModelDOM.innerText.split(' '),
            str = '';
        if (arr.length == 3) {
            str = arr[0] + " " + arr[1]
        } else {
            str = arr.join(' ')
        }
        copy(str)
    }

    // 复制标题 
    let titleDOM = showConts[i].querySelector(".tit-box");
    DomStyle(titleDOM);
    titleDOM.onclick = function () {
        let hrefStr = carModelDOM.querySelector('a').href;
        this.style.color = 'red';
        let str = this.innerText;
        if (n) {
            let index = str.indexOf('款'),
                arr = str.split('');
            str = '';
            for (let k = index - 4; k < arr.length; k++) {
                str += arr[k];
            }
            str = str.slice(0, 5) + ' ' + str.slice(5);
            copy(str);
            localStorage.setItem("hrefStr", hrefStr);
            localStorage.setItem("titleStr", this.innerText);
            // 一键打开图片
            let imgs = showConts[i].querySelector('.image-list').querySelectorAll('img')
            for (let j = imgs.length - 1; j >= 0; j--) {
                let imgUrl = imgs[j].src;
                window.open(imgUrl);
            }
        } else {
            let index = str.indexOf('款'),
                arr = str.split('');
            str = '';
            for (let k = index + 1; k < arr.length; k++) {
                str += arr[k];
            }
            copy(str);
        }
    }
    // 复制发表时间
    let publishTimeDOM = showConts[i].childNodes[0].childNodes[2].childNodes[2];
    commonCopy(publishTimeDOM);
    publishTimeDOM.style.backgroundColor = 'white';
    //复制点评id
    let reviewIdDom = showConts[i].childNodes[0].childNodes[2].childNodes[0];
    reviewIdDom.onclick = () => copy(reviewIdDom.innerText.replace('点评ID：', ''))
    reviewIdDom.style.backgroundColor = 'white';

}

function DomStyle(dom) {
    dom.style.cursor = 'pointer';
    dom.style.backgroundColor = "#E2E7D1";
    dom.onmouseout = function () {
        this.style.color = '#606266';
    }
}

function commonCopy(dom, type) {
    DomStyle(dom);
    dom.onclick = function () {
        this.style.color = 'red';
        let str = this.innerText;
        copy(str);
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

document.onkeydown = function (e) {
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
    _div.style.width = '50px';
    _div.style.height = '50px';
    _div.style.background = '#19be6b';
    _div.style.position = 'fixed';
    _div.style.bottom = '40%';
    _div.style.left = '0';
    _div.style.cursor = 'pointer'
    document.body.appendChild(_div);
    _div.onclick = (e) => uidMark();
}


