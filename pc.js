document.body.style.userSelect = "none";
document.body.style.backgroundColor = "#E2E7D1";
document.querySelector('.header').style.display = "none";
document.querySelectorAll('.pages')[1].onclick = () => scrollTo(0, 0)


let _div = document.createElement('div');
_div.style.width = '50px';
_div.style.height = '50px';
_div.style.background = '#19be6b';
_div.style.position = 'fixed';
_div.style.bottom = '50%';
_div.style.left = '0';
_div.style.cursor = 'pointer'
_div.onclick = () => scrollTo(0, 0)
document.body.appendChild(_div);


let a = document.querySelector('.w450').querySelectorAll('.el-form-item');
for (let i = 0; i < a.length; i++) {
    if (i == 1 || i == 5 || i == 12) continue;
    a[i].style.display = "none"
}
window.onbeforeunload = (e) => {
    return confirm('确认离开吗?');
}