document.body.style.backgroundColor = "#E2E7D1";
document.querySelector("#app").style.display = "none";
document.onclick = () => {
    let hrefStr = localStorage.getItem('hrefStr');
    window.open(hrefStr)
}

let _div = document.createElement('div');
_div.style.width = '200px';
_div.style.height = '200px';
_div.style.background = '#19be6b';
_div.style.position = 'fixed';
_div.style.bottom = '50%';
_div.style.left = '0';
_div.style.cursor = 'pointer'
_div.onclick = () => scrollTo(0, 0)
document.body.appendChild(_div);

_div.onclick = (e) => {
    e.stopPropagation();
    let titleStr = localStorage.getItem('titleStr');
    window.open(`https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&ch=4&tn=98010089_dg&wd=${'易车 '+titleStr}`);
}
window.onbeforeunload = (e) => {
    return confirm('确认离开吗?');
}