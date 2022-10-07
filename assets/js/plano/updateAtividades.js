const painelDeAtividades = document.getElementById("formulario:passoAPasso:panelAtividades");

const camposData = painelDeAtividades.querySelectorAll("table tbody tr td:nth-of-type(1n) span input");
const camposConteudo = painelDeAtividades.querySelectorAll("table tbody tr td:nth-of-type(2n) textarea");

camposData.forEach(function(field, i) {
    field.value = atividades[i][0];
});

camposConteudo.forEach(function(field, i) {
    field.value = atividades[i][1];
});
