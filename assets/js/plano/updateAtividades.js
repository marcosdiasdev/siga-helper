/*
var campoData = document.getElementById("formulario:passoAPasso:dataPrevista_input");
var campoBase = document.getElementsByName("formulario:passoAPasso:j_idt95")[0];
var insertBtn = document.getElementsByName("formulario:passoAPasso:j_idt97")[0];
*/

var painelDeAtividades = document.getElementById("formulario:passoAPasso:panelAtividades");

var camposData = painelDeAtividades.querySelectorAll("table tbody tr td:nth-of-type(1n) span input");
var camposConteudo = painelDeAtividades.querySelectorAll("table tbody tr td:nth-of-type(2n) textarea");
//Array.from(elementos).length;

camposData.forEach(function(field, i) {
    field.value = atividades[i][0];
});

camposConteudo.forEach(function(field, i) {
    field.value = atividades[i][1];
});