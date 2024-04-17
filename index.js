const express = require("express")
const bodyParser = require("body-parser");
const sqlite = require("sqlite3");
const app = express();
const __dir = "C:/Users/ykaru/OneDrive/Documentos/gestão financeira projeto";
app.use(express.static(__dir + "/src"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite.Database("dados.db");

//db.run("CREATE TABLE logs (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT UNIQUE, value TEXT, tipo TEXT);");


app.listen('5000', () => {
    console.log("Servidor online na porta - > 5000")
});

app.get('/', (req, res) => {
    res.sendFile(__dir + '/src/index.html');
});

function insert_table({ nome, valor, tipo }) {
    let errorMessage = db.run(`INSERT INTO logs (nome, value, tipo) VALUES (?,?,?);`, [nome,valor,tipo], (err) => {
        if(err && err.name == "SQLITE_CONSTRAINT")
        {
            return "O nome ja é existente";
        }
    });
    return errorMessage;
}
function delete_items(id) {
    db.run("DELETE FROM logs WHERE nome=?;", [id], (err) => {
        if (err)
        {
            console.log("Item não encontrada ou erro desconhecido : ", err);
        }
    });
}


app.post('/registro', (req, res) => {
    let dados = req.body;
    let name = dados.nome;
    let val = dados.valor;
    let type = dados.tipo;
    try {
        let errorMessage = insert_table({
            nome: name,
            valor: val,
            tipo: type
        });
        if(errorMessage)  res.json({error_title : "Ocorreu um erro.", error_description:errorMessage});
    } catch (error) {
        console.log(error)
        console.log(dados)
    }
});
app.get('/registro', (req, res) => {
    db.all('SELECT * FROM logs', (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log("= > colunas : ", rows)
            res.send(rows)
        }
    });
});

app.delete('/delete-item/', (req, res) => {
    const id = req.body.name;
    delete_items(id);
});