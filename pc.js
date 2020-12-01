document.body.style.background = '#DFE6C7';
document.body.style.userSelect = "none";
document.querySelector('.header').style.display = "none";
document.querySelectorAll('.pages')[1].onclick = () => scrollTo(0, 0)


let _div = document.createElement('div');
_div.style.width = '50px';
_div.style.height = '50px';
_div.style.background = '#19be6b';
_div.style.position = 'fixed';
_div.style.bottom = '50%';
_div.style.right = '0';
_div.style.cursor = 'pointer'
_div.onclick = () => scrollTo(0, 0)
document.body.appendChild(_div);


let formElems = document.querySelector('.w450').querySelectorAll('.el-form-item');
for (let i = 0; i < formElems.length; i++) {
    if (i == 1 || i == 5 || i == 13) continue;
    formElems[i].style.display = "none"
}
window.onbeforeunload = (e) => {
    return confirm('确认离开吗?');
}