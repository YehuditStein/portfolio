function clearInput() {
    document.getElementById("result").value = "";
}

function addChar(char) {
    console.log(char);
    
    document.getElementById("result").value += char;
}

function showResult() {
    let ex = document.getElementById("result").value;
    let res = eval(ex);
    document.getElementById("result").value = res;
}
