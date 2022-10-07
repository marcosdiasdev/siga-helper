const mainURL = "https://sigaprof.ifto.edu.br";
const conteudoPageTitle = "Diários-EDU :: Conteúdo";
const planoDeEnsinoPageTitle = "Diários-EDU :: Plano de Ensino";

const contentArea = document.getElementById("contentArea");
const title = document.getElementById("title");
const pageMsgArea = document.getElementById("pageMsgArea");
const textAreaPlano = document.getElementById("textAreaPlano");
const textAreaConteudo = document.getElementById("textAreaConteudo");

const getDatesBtn = document.getElementById("getDatesBtn");
const contAulas = document.getElementById("contAulas");

const updateContentBtn = document.getElementById("updateContentBtn");
const rowMsgArea = document.getElementById("rowMsgArea");
const atividadesInPage = 0;

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    
    

    let url = tabs[0].url;
    let pageTitle = tabs[0].title;

    if(!url.includes(mainURL)) {
        contentArea.style.display = "none";
        pageMsgArea.innerHTML = "<p class='text-center'>SIGA não encontrado.</p>";
    } else {

        if(pageTitle == conteudoPageTitle) {
            title.textContent = "Conteúdo"
            document.querySelector("#conteudoOptionsBox").style.display = "block";
        }
        else if(pageTitle == planoDeEnsinoPageTitle) {
            title.textContent = "Plano de Ensino";
            document.querySelector("#planoOptionsBox").style.display = "block";
            textAreaPlano.style.display = "block";
            chrome.tabs.executeScript(null, {file: 'assets/js/plano/countAtividades.js'}, function(result){
                atividadesInPage = parseInt(result);
                pageMsgArea.innerHTML = `<p>${result} atividades encontradas na página.</p>`;
            });
        }
        else {
            pageMsgArea.innerHTML = "<p class='text-center'>Página desconhecida. Acesse Conteúdo ou Plano de Ensino.</p>";
        }
    }
});

getDatesBtn.addEventListener('click', function() {
    chrome.tabs.executeScript(null, {code: `var contAulas = ${contAulas.value};`}, function() {
        chrome.tabs.executeScript(null, {file: 'assets/js/conteudo/getDatas.js'}, function(result){
            textAreaConteudo.innerHTML = result;
        });
    });
});

textAreaPlano.addEventListener('change', countAtividadesPlano);
textAreaPlano.addEventListener('keyup', countAtividadesPlano);

updateContentBtn.addEventListener('click', function() {

    content = textAreaPlano.value.trim().split('\n');
    content = content.map((row) => row.split('\t'));
    rowMsgArea.textContent = `${content.length} atividades na fila.`;

    contentJSON = JSON.stringify(content);

    chrome.tabs.executeScript(null, {code: 'var atividades = ' + contentJSON}, function() {
        chrome.tabs.executeScript(null, {file: 'assets/js/plano/updateAtividades.js'}, function(result){
            
        });
    });
});

// Atualiza número de atividades inseridas no textarea da extensão
function countAtividadesPlano() {
    content = textAreaPlano.value.trim().split('\n');
    content = content.map((row) => row.split('\t'));
    rowMsgArea.textContent = `${content.length} atividades na fila.`;

    updateContentBtn.disabled = content.length != atividadesInPage;
}
