const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'repertorio',
    password: 'admin',
    port: 5432
});

const ingresar = async (datos) => {
    const consulta = {
        text: "INSERT INTO repertorio(cancion,artista,tono) values ($1, $2, $3) RETURNING *;",
        values: datos,
    }
    try {
        const result = await pool.query(consulta);
        return result;
    } catch (err) {
        console.log('Error: ', err);
        return err;

    }

};

const consultar = async () => {
    try {
        const result = await pool.query('SELECT * FROM repertorio');
        return result;
    } catch (err) {
        console.log('Error: ', err);
        return err;
    }
}

const editar = async (datos) => {
    const consulta = {
        text: 'UPDATE repertorio SET cancion = $1, artista = $2, tono = $3 WHERE cancion = $1  RETURNING *;',
        values: datos,
    }
    try{
        const result = await pool.query(consulta);
        return result;
    }catch(err){
        console.log('Error: ', err);
        return err;
    }
}

const eliminar = async (id) => {
    try{
        const result = await pool.query(`DELETE FROM repertorio WHERE id = ${id}`);
        return result;
    }catch(err){
        console.log('Error: ', err);
    }
}

module.exports = {ingresar, consultar, editar, eliminar}
