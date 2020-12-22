document.body.style.userSelect = 'none';
document.body.style.background = '#DFE6C7';
document.querySelector("#app").style.display = "none";
window.onbeforeunload = () => confirm('确认离开吗?');

let ifr = document.createElement('iframe');
ifr.style.width = '100%';
ifr.style.height = '100rem';
document.body.appendChild(ifr);

function createMyDom(domText, index) {
    let _div = document.createElement('div');
    _div.style.width = '100px';
    _div.style.height = '50px';
    _div.style.background = '#19be6b';
    _div.style.cursor = 'pointer';
    _div.style.color = 'white';
    _div.style.textAlign = 'center';
    _div.style.lineHeight = '50px';
    _div.style.position = "fixed";
    _div.style.top = `${index * 10}%`;
    _div.style.left = '0';
    _div.style.opacity = 0.2;
    _div.innerHTML = domText;
    document.body.appendChild(_div);
    return _div;
}
createMyDom('汽车之家', 1).onclick = () => window.open(`https://www.baidu.com/s?wd=${localStorage.getItem('titleStr')} 汽车之家`);
createMyDom('车型信息', 2).onclick = () => ifr.src = localStorage.getItem('targetURL_carMsg');
createMyDom('车型图片', 3).onclick = () => ifr.src = localStorage.getItem('targetURL_carImg');