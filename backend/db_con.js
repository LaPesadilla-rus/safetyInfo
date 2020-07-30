const conn_str =  ({
    user: 'postgres',
    host: 'localhost',
    database: 'sklad',
    password: 'masterpas',
    port: 5432,
    max: 3
});

const conn_str_download =  ({
    user: 'postgres',
    host: 'localhost',
    database: 'test_sklad',
    password: 'masterpas',
    port: 5432,
    max: 3
});

const conn_saf = ({
    user: 'postgres',
    host: 'localhost',
    database: 'safetyInfo',
    password: 'masterpas',
    port: 5432,
    max: 3
})

const conn_bahos = ({
    user: 'postgres',
    host: 'localhost',
    database: 'spr_bahos',
    password: 'masterpas',
    port: 5432,
    max: 3
})

module.exports.conn_bahos = conn_bahos;
module.exports.conn_str = conn_str;
module.exports.conn_saf = conn_saf;
module.exports.conn_str_download = conn_str_download;
