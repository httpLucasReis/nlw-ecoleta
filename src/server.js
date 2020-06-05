// Módulos -> são aplicações feitas por terceiros para tornar a programação mais produtiva
// node packge mananger

// Pedindo o express para iniciar o servidor
const express = require("express");

// Executando o express
const server = express();

// Utilizando template engine 
// facilita o acrescimento de elementos na página
const nunjucks = require("nunjucks");
// ("<- diretório das páginas em html", {servidor: nome, noCache: true -> sem cache, evita bugs})
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});


// Configurar pasta pública
// use -> configuração específicas do servidor
// static - > faz os arquivos estáticos (public) sejam visíveis ao servidor
server.use(express.static("public"))

// cannotget -> o servidor não encontrou um caminho

// get -> verbo do http 
// Configurar caminhos para minha aplicação
// página inicial
// req: requisição
// res: resposta
// __dirname -> variável global já criada 
// sendFile -> manda um arquivo

server.get("/", (req, res) => {
    // render pode ser utilizado para enviar variável ao html
    // ou até mesmo uma página 
    return res.render("index.htm");
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.htm");
})

server.get("/search", (req, res) => {
    return res.render("search-results.htm");
})

//ligar o servidor
server.listen(3000);