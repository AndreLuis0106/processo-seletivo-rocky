//Autor: André Luís de Souza Oliveira
//Esse programa foi feita para o processo seletivo da Rocky Monks

//Função que lê os JSONs
function ler_json(){
    try{
        let resquisicao1 = require('./broken_database_1.json');
        let resquisicao2 = require('./broken_database_2.json');

        var database1 = JSON.parse(JSON.stringify(resquisicao1));
        var database2 = JSON.parse(JSON.stringify(resquisicao2));
      
        return {
            database1,
            database2
        };
    } catch(err){
        console.log("Não foi possível ler os arquivos!" + "\n" + err);
        return null;
    }
}

//Função que corrige os caracteres especiais
function corrige_nome(db_carro, db_marca){
    for(i = 0; i < db_carro.length; i++){
        db_carro[i].nome = db_carro[i].nome.replace(/æ/g, "a");
        db_carro[i].nome = db_carro[i].nome.replace(/ø/g, "o");
    }

    for(k = 0; k < db_marca.length; k++){
        db_marca[k].marca = db_marca[k].marca.replace(/æ/g, "a");
        db_marca[k].marca = db_marca[k].marca.replace(/ø/g, "o");
    }
}

//Função que transforma os números em string para number
function corrige_vendas(db_carro){
    for (i = 0; i < db_carro.length; i++) {
        if (typeof db_carro[i].vendas === 'string') { // verifica se a variavável vendas é do tipo string
            db_carro[i].vendas = Number(db_carro[i].vendas); // modifica seu valor para number
        }
    }
}

//Função que cria os JSONs de saida
function export_json(db_carro, db_marca){
    let fs = require('fs'); // criada uma requisição para guardar o arquivo 
    fs.writeFile("./fix_database_1.json", JSON.stringify(db_carro, null, 4), function (err) { // criação de um novo arquivo JSON 
        if (err) throw err; // tratamento de exceção caso não seja possível criar o arquivo
    }
    );

    fs.writeFile("./fix_database_2.json", JSON.stringify(db_marca, null, 4), function (err) { // criação de um novo arquivo JSON 
        if (err) throw err; // tratamento de exceção caso não seja possível criar o arquivo
    }
    );
}
 
let databases = ler_json();
let data_carro = databases.database1;
let data_marca = databases.database2;

if(databases){
    corrige_nome(data_carro, data_marca);
    corrige_vendas(data_carro);
    export_json(data_carro, data_marca);
}