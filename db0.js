document.body.style.userSelect = "none";
document.body.style.backgroundColor = "#E2E7D1";
// 返回顶部
document.querySelectorAll('.pages')[1].onclick = () => scrollTo(0, 900)


var showConts = document.querySelectorAll('.show-cont');
var n = 1; // 1 完整标题  0 截取的标题
for (let i = 0; i < showConts.length; i++) {

    showConts[i].querySelector('.cont_text').style.display = 'none';
    showConts[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[1].style.display = 'none';

    // 查询车牌
    let buyCarAddrDOM = showConts[i].childNodes[0].childNodes[4].childNodes[4].childNodes[2];
    DomStyle(buyCarAddrDOM);
    buyCarAddrDOM.onclick = function () {
        window.open(`https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&ch=4&tn=98010089_dg&wd=${this.innerText.trim()}车牌`);
    }

    // 复制车型
    let carModelDOM = showConts[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2];
    DomStyle(carModelDOM);
    carModelDOM.onclick = function () {
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
    let titleDOM = showConts[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
    titleDOM.title = titleDOM.innerText;
    DomStyle(titleDOM);
    titleDOM.onclick = function () {
        this.style.color = 'red';
        let str = this.innerText;
        if (n) {
            let index = str.indexOf('款'),
                arr = str.split('');
            str = '';
            for (let k = index + 1; k < arr.length; k++) {
                str += arr[k];
            }
            copy(str);
            let hrefStr = carModelDOM.querySelector('a').href;
            localStorage.setItem("hrefStr", hrefStr)
            let imgs = showConts[i].querySelector('.image-list').querySelectorAll('img')
            for (let j = 0; j < imgs.length; j++) {
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
    //复制点评id
    let reviewIdDom = showConts[i].childNodes[0].childNodes[2].childNodes[0];
    commonCopy(reviewIdDom);

}

function DomStyle(dom) {
    dom.style.cursor = 'pointer';
    dom.onmouseout = function () {
        this.style.color = '#606266';
    }
}

function commonCopy(dom) {
    DomStyle(dom);
    dom.onclick = function () {
        this.style.color = 'red';
        copy(this.innerText);
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
    return res; // 返回操作结果
}


document.onkeydown = function (e) {
    e = window.event || e;
    var k = e.keyCode;
    //屏蔽ctrl+R，F5键，ctrl+F5键  F3键！验证
    if ((e.ctrlKey == true && k == 82) || (k == 116) ||
        (e.ctrlKey == true && k == 116) || k == 114) {
        e.keyCode = 0;
        e.returnValue = false;
        e.cancelBubble = true;
        alert(`NO`)
        return false;

    }
}