document.body.style.backgroundColor = "#E2E7D1";
document.querySelector("#app").style.display = "none";
document.onclick = () => {
    let hrefStr = localStorage.getItem('hrefStr');
    window.open(hrefStr)
} 

let _div = document.createElement('div');
_div.style.width = '100px';
_div.style.height = '50px';
_div.style.background = '#19be6b';
_div.style.position = 'fixed';
_div.style.bottom = '40%';
_div.style.left = '0'; 
_div.style.cursor = 'pointer'
document.body.appendChild(_div);

_div.onclick = (e) => {
    e.stopPropagation();
    let titleStr = localStorage.getItem('titleStr');
    window.open(`https://www.baidu.com/s?wd=${titleStr} 汽车之家`);
}
window.onbeforeunload = (e) => {
    return confirm('确认离开吗?');
}

