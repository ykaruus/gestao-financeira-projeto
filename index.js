const bodyParser = require("body-parser");
const express = require("express")
const sqlite = require("sqlite3");
const app = express();
const __dir = "C:/Users/ykaru/OneDrive/Documentos/gestão financeira projeto";
const Utils = require("./utils/utils.js");
const colors = require("colors");
app.use(express.static(__dir + "/src"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite.Database("dados.db");

const utils = new Utils(db);

//db.run("CREATE TABLE logs (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT UNIQUE, value TEXT, tipo TEXT);");

app.listen('5000', () => {
    console.log("127.0.0.1 : 5000\n" + "STATUS : ".yellow + "ONLINE".green)
});

app.get('/', (req, res) => {
    res.sendFile(__dir + '/src/index.html');
});




app.post('/registro', async (req, res) => {
    let dados = req.body;
    let name = dados.nome;
    let val = dados.valor;
    let type = dados.tipo;
    let payload = {
        error_code: ""
    }
    console.log(`BUFFER STRING => ${name.length} ${val.length}`.cyan)
    if (name.length > 10 || val.length > 10) {
        console.log("O tamanho dos dados ultrapassou o limite".red);
        payload.error_code = "length>10"
        res.json(payload)
    } else {
        try {
            await utils.insert_table({
                nome: name,
                valor: val,
                tipo: type
            });
            console.log(`POST => [${name},${val},${type}] => '/registro'`.yellow)
        } catch (error) {
            console.log("Ocorreu um erro : %d".red, error)
            res.statusCode = 500;

        }
    }
});
app.get('/registro', (req, res) => {
    db.all('SELECT * FROM logs', (err, rows) => {
        if (err) {
            console.log(`Erro ao tentar obeter as colunas : ${err}`.red);
        } else {
            console.log(`GET => '/registro' => colunas :`.green);
            rows.forEach(item => {
                console.log(item);
            });
            res.send(rows);
        }
    });
});

app.post('/delete-item', async (req, res) => {
    const id_sql = req.body.id;
    let isSucess = utils.delete_items(id_sql);
    res.json({
        sucess: isSucess
    });
});