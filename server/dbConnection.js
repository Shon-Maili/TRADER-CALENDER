const Pool = require("pg").Pool;



const pool = new Pool({
    user: "postgres",
    password: "shonmaili8404",
    host: "localhost",
    port:5432,
    database:"trades_app"
});

module.exports=pool;
