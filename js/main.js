function nextPage(e) {
    let father = e.target.parentElement;
    while (father && !father.classList.contains("page")) {
        father = father.parentElement;
    }
    father.classList.add("page-flipped");
}

function walk(stripe, i) {
    stripe.style.transform = "translateY(-" + (i * 100) + "%)";
    if ((i++) >= stripe.childElementCount - 1) {
        i = 0;
    }
    setTimeout(walk, 3000, stripe, i);
}

let scrolling = false;
let boxes;

function magnetScroll() {
    if (scrolling) {
        scrolling = false;
        requestAnimationFrame(magnetScroll);
        return;
    }
    let left = boxes.scrollLeft;
    let em = parseFloat(getComputedStyle(boxes).fontSize);
    let width = 17 * em;
    let index = Math.floor(left / width);
    let progress = (left % width) / width;
    let target =
        progress < 0.5 ?
        index * width : (index + 1) * width;
    boxes.scrollLeft -= (boxes.scrollLeft - target) * 0.2;
    requestAnimationFrame(magnetScroll);
}

function flip() {
    function toggleClass(id, cls) {
        let elem;
        if ((elem = document.querySelector(id)).classList.contains(cls)) {
            elem.classList.remove(cls);
        } else {
            elem.classList.add(cls);
        }
    }
    toggleClass(".page-cover", "flip");
    toggleClass("#avatar", "flip");
}

window.addEventListener("load", () => {
    let buttons = document.querySelectorAll(".next");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", nextPage);
    }
    let pages = document.querySelectorAll(".page");
    for (let i = 0; i < pages.length; i++) {
        pages[i].setAttribute("style", "z-index: " + -i);
    }
    let stripe = document.querySelector(".stripe");
    setTimeout(walk, 3000, stripe, 0);
    requestAnimationFrame(magnetScroll);
    boxes = document.querySelector(".boxes");
    boxes.addEventListener("scroll", () => {
        scrolling = true;
    });
    window.flip = flip; // Too lazy to export
});
