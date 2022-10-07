const datas = Array.from(document.querySelectorAll("#listaaulas tbody tr td:first-of-type"));
let content = '';

for(i = 0; i < datas.length; i+=contAulas) {
    //document.querySelector("body").innerHTML += datas[i].textContent + "<br>";
    content += datas[i].textContent.trim() + "\n";
}

content;
