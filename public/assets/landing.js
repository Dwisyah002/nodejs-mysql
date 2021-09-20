const body = document.querySelector("body");
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const footer = document.querySelector("footer");
var section = document.getElementsByClassName("section");
var list_title = document.getElementsByClassName("list_title");

var styleState = "";

// style remover
function removeStyle(style) {
    body.classList.remove(style);
    header.classList.remove(style);
    nav.classList.remove(style);
    footer.classList.remove(style);
    for (let i = 0; i < section.length; i++){
        section[i].classList.remove(style);
    }
    for (let i = 0; i < list_title.length; i++){
        list_title[i].classList.remove(style);
    }
}

// style adder
function addStyle(style) {
    body.classList.add(style);
    header.classList.add(style);
    nav.classList.add(style);
    footer.classList.add(style);
    for (let i = 0; i < section.length; i++){
        section[i].classList.add(style);
    }
    for (let i = 0; i < list_title.length; i++){
        list_title[i].classList.add(style);
    }
}

// to normal mode
function toNormalMode() {
    if (styleState == "light" || styleState == "dark") {
        removeStyle(styleState)
    }
    styleState = "";
}

// to dark mode
function toDarkMode() {
    if (styleState == "light") {
        removeStyle(styleState)
    }
    else {
        if (styleState == "dark") {
            return
        }
    }
    styleState = "dark";
    addStyle(styleState);
}

// to light mode
function toLightMode() {
    if (styleState == "dark") {
        removeStyle(styleState)
    }
    else {
        if (styleState == "light") {
            return
        }
    }
    styleState = "light";
    addStyle(styleState);
}