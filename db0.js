document.body.style.userSelect = "none";
document.body.style.backgroundColor = "#E2E7D1";
// ���ض���
document.querySelectorAll('.pages')[1].onclick = () => scrollTo(0, 900)


var showConts = document.querySelectorAll('.show-cont');
var n = 1; // 1 ��������  0 ��ȡ�ı���
for (let i = 0; i < showConts.length; i++) {

    showConts[i].querySelector('.cont_text').style.display = 'none';
    showConts[i].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[1].style.display = 'none';

    // ��ѯ����
    let buyCarAddrDOM = showConts[i].childNodes[0].childNodes[4].childNodes[4].childNodes[2];
    DomStyle(buyCarAddrDOM);
    buyCarAddrDOM.onclick = function () {
        window.open(`https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&ch=4&tn=98010089_dg&wd=${this.innerText.trim()}����`);
    }

    // ���Ƴ���
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

    // ���Ʊ���
    let titleDOM = showConts[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
    titleDOM.title = titleDOM.innerText;
    DomStyle(titleDOM);
    titleDOM.onclick = function () {
        this.style.color = 'red';
        let str = this.innerText;
        if (n) {
            let index = str.indexOf('��'),
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
            let index = str.indexOf('��'),
                arr = str.split('');
            str = '';
            for (let k = index + 1; k < arr.length; k++) {
                str += arr[k];
            }
            copy(str);
        }
    }
    // ���Ʒ���ʱ��
    let publishTimeDOM = showConts[i].childNodes[0].childNodes[2].childNodes[2];
    commonCopy(publishTimeDOM);
    //���Ƶ���id
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
 * �����ַ�����������ĺ���
 * @param {String} value ��Ҫ�����Ƶ��ַ���
 * @returns {Boolean} �������
 */
function copy(value) {
    console.log(value);
    var currentFocus = document.activeElement; // ���浱ǰ��ڵ�
    let input = document.createElement('input'); // ����һ��input��ǩ
    document.body.appendChild(input); // �ѱ�ǩ��Ӹ�body
    input.style.opacity = 0; //����input��ǩ����Ϊ͸��(���ɼ�)
    input.value = value; // ����Ҫ���Ƶ�ֵ�ŵ�input��
    // ��¼��ǰ����λ��, ��Ϊ��ӽڵ㲢ѡ�е�ʱ���Ӱ��ҳ�����
    let scrollY = window.scrollY;
    input.focus(); // input�ڵ��ȡ����
    input.setSelectionRange(0, input.value.length); // ѡ��input���е���������
    var res = document.execCommand('copy', true); // �������ֲ���ȡ���
    currentFocus.focus(); // ֮ǰ��ڵ��ý���
    document.body.removeChild(input); // ɾ����ӵ�input�ڵ�
    // ҳ�������֮ǰλ��
    window.scrollTo(0, scrollY);
    return res; // ���ز������
}


document.onkeydown = function (e) {
    e = window.event || e;
    var k = e.keyCode;
    //����ctrl+R��F5����ctrl+F5��  F3������֤
    if ((e.ctrlKey == true && k == 82) || (k == 116) ||
        (e.ctrlKey == true && k == 116) || k == 114) {
        e.keyCode = 0;
        e.returnValue = false;
        e.cancelBubble = true;
        alert(`NO`)
        return false;

    }
}