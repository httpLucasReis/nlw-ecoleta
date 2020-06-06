// Importar a dependência do SQLite 3
// Método verbose -> mensagens no terminal 
const sqlite3 = require("sqlite3").verbose();

// criar objeto que ira operações no banco de dados
// utilizando construtores para se criar um objeto
// . - > raiz do projeto 
const db = new sqlite3.Database("./src/database/database.db");

// exportando o objeto db
module.exports = db;

// Utilizar o objeto de banco de dados para nossas operações


/* --- Introdução a database
db.serialize( () => {



    
    // COM COMANDOS SQL

    // Cria uma tabela 
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT, 
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);
    

    // inserir dados na tabela
    
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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Maranhão",
        "São luís",
        "Resíduos eletrônicos e lampadas"
    ];
    

    // Callback - > chama um função 
    // É uma função passada como parâmentro
    // Ela é chamada depois algum tempo
    // Impede que aplicação fique travada 

    function afterInsertData(err){
        if(err){
            return console.log(err);
        };

        console.log("Cadastro com Sucesso");
        console.log(this);
    }

    db.run(query, values, afterInsertData);

    

    // consultar dados da tabela 
    db.all(`SELECT name FROM places`, function(err, rows) {
        if(err){
            return console.log(err);
        };

        console.log("Aqui estão seus registros");
        console.log(rows);
    }); 

    // Deletar um dado da tabela 
    // ? - > se refere a uma coleção
    // deleta da tabala 
    // se id for igual ao [id presente no database] - deletar

    db.run(`DELETE FROM places WHERE id = ?`, [4], function(err) {
        if(err){
            return console.log(err);
        };

        console.log("Registro deletado com sucesso");
    });

});

------- */
