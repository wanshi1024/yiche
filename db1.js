document.body.style.backgroundColor = "#E2E7D1";
document.querySelector("#app").style.display = "none";
function createMyDom(domText) {
    let _div = document.createElement('div');
    _div.style.width = '100px';
    _div.style.height = '50px';
    _div.style.background = '#19be6b';
    _div.style.margin = '5% 40%';
    _div.style.cursor = 'pointer';
    _div.style.color = 'white';
    _div.style.textAlign = 'center';
    _div.style.lineHeight = '50px';
    _div.innerHTML = domText;
    document.body.appendChild(_div);
    return _div;
}
createMyDom('汽车之家').onclick = () => window.open(`https://www.baidu.com/s?wd=${localStorage.getItem('titleStr')} 汽车之家`);
createMyDom('车型信息').onclick = () => window.open(localStorage.getItem('hrefStr1'));
createMyDom('车型图片').onclick = () => window.open(localStorage.getItem('hrefStr2'));
window.onbeforeunload = () => confirm('确认离开吗?');


