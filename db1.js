document.body.style.backgroundColor = "#E2E7D1";

var zs = document.querySelector('.w450').childNodes;
for (let i = 0; i < zs.length; i++) {
    if (zs[i].nodeName == 'DIV')
        zs[i].style.display = 'none';
}

document.onclick = function () {
    let hrefStr = localStorage.getItem('hrefStr');
    window.open(hrefStr)
}

let showCont = document.querySelectorAll('.show-cont');
for (let i = 0; i < showCont.length; i++) {
    showCont[i].style.display = 'none'
}

let pages = document.querySelectorAll(".pages")
pages.forEach(e => {
    e.style.display = "none"
});