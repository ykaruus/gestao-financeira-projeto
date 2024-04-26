class Utils {
    constructor(newdb) 
    {
        this.db = newdb;
        console.clear();
        console.log("UTILS.JS => A classe utils foi carregado com êxito".blue);
    }
    async insert_table({ nome, valor, tipo }) {
        await this.db.run(`INSERT INTO logs (nome, value, tipo) VALUES (?,?,?);`, [nome,valor,tipo], (err) => {
            if(err && err.code == "SQLITE_CONSTRAINT")
            {
                 console.log(`[WARNING] ${nome} O nome ja é existente`.yellow);
            }
        });
    }
    async delete_items(id) {
        let sucess =true;
        await this.db.run("DELETE FROM logs WHERE nome=?;", [id], (err) => {
            if (err)
            {
                console.log("Item não encontrada ou erro desconhecido : ", err);
                sucess = false;
            } else {
                console.log(`DELETE => [${id}] '/delete-item' => sucess`);
            }
        });
        return sucess;
    }
}


module.exports = Utils;