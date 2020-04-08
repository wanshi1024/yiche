document.body.style.backgroundColor = "#E2E7D1";
document.querySelector("#app").style.display = "none";
document.onclick = () => {
    let hrefStr = localStorage.getItem('hrefStr');
    window.open(hrefStr)
}