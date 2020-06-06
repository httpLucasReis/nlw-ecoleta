// Módulos -> são aplicações feitas por terceiros para tornar a programação mais produtiva
// node packge mananger

// Pegar o banco de dados 

const db = require('./database/db');

// Pedindo o express para iniciar o servidor
const express = require("express");

// Executando o express
const server = express();

// Habilitar o uso do req.body -> formulários
server.use(express.urlencoded({ extended: true }))

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
});

server.get("/create-point", (req, res) => {
    // req.query: Query strings da nossa url.
    console.log(req.query);

    return res.render("create-point.htm");
});


// Envia os dados de forma mais segura
// Não é possível o query para capturar os dados
server.post("/savepoint", (req, res) => { 
    // red.body: o corpo do formulário
    console.log(req.body);

    // inserir dados no database 

    const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?); 
        `;
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2, 
        req.body.state, 
        req.body.city,
        req.body.items
    ];
    

    // Callback - > chama um função 
    // É uma função passada como parâmentro
    // Ela é chamada depois algum tempo
    // Impede que aplicação fique travada 

    function afterInsertData(err){
        if(err){
            console.log(err);
            return res.send("Erro no cadastro");
        };

        console.log("Cadastro com Sucesso");
        console.log(this);

        return res.render("create-point.htm", { saved: true });
    }

    db.run(query, values, afterInsertData);

});

server.get("/search", (req, res) => {

    // utilizando o get para captar a string digitada no campo de pesquisa
    const search = req.query.search;

    if(search == ""){
        // pesquisa vazia
        // variável total está dentro de if no search-results
        // Variável total = 0 e não é exibido nenhum resultado
        return res.render("search-results.htm", { total: 0 });
    }

    // Pegar os dados do banco de dados
    // string no sql é utilizada com aspas simples
    // LIKE %variável% -> Pode vir qualquer coisa da palavra
    // sul
    // Chapadão do sul
    // Rio do sul 

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err){
            return console.log(err);
        };

        console.log(rows);

        // Conta quantos elementos possuem dentro do array 
        const total = rows.length;
        
        // Mostrar a página html com os dados do banco de dados
        return res.render("search-results.htm", {places: rows, total: total});
    }); 

});

//ligar o servidor
server.listen(3000);