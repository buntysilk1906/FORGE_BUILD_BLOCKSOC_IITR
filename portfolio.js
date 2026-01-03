

let num = document.getElementById("number")


let value = 0;
function increase() {
    num.innerText = "COUNT :" + " " + value;
    value++
}

let num2;
let num1;
let themechange = 0;

function input() {
    num1 = Number(document.getElementById("i1").value)
    num2 = Number(document.getElementById("i2").value) //cause the value will give you the string 
}
let r = document.getElementById("result");

function add() {
    r.innerText = " "
    r.innerText += "Result:" + (num1 + num2);

}
function substract() {
    r.innerText = " "
    r.innerText += "Result:" + (num1 - num2);
}
function multiply() {
    r.innerText = " "
    r.innerText += "Result:" + (num1 * num2);
}
function division() {
    r.innerText = " "
    r.innerText += "Result:" + (num1 / num2);
}


function hi() {
    if (themechange % 2 === 0) {
        document.body.style.backgroundColor = "#343131ff"
        document.getElementById("switch").innerText = "Dark";
        themechange++;
    }
    else {
        document.body.style.backgroundColor = "#ffffffff"
        document.getElementById("switch").innerText = "light";
        themechange++;
    }

}