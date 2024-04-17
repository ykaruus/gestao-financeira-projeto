class Utils {
    constructor(newdb) 
    {
        this.db = newdb;
    }
    create_table()
    {
        this.db.exec(
            `
            CREATE TABLE logs (
                id INTERGER PRIMARY KEY,
                nome TEXT UNIQUE,
                value FLOAT,
                tipo TEXT
            );
            `
        );
    }
    insert_table({nome,valor,tipo}) {
        this.db.exec(`
            INSERT INTO logs (nome, value, tipo) VALUES ();
        `);
    }
}


module.exports = Utils;