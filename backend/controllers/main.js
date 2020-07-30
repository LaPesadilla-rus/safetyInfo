const Main = require('../models/main.js');

exports.all = async (req, res) => {
    let data = [];
    await Main.all((err, docs) =>{
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data = docs.rows;
    });
    for(let i = 0; i< data.length; i += 1){
        await Main.pers(data[i], (err, docs) =>{
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            data[i].ma_fio = docs.rows[0].pe_fio;
            data[i].ot_name = docs.rows[0].ot_name;
        }); 
    }
    

    return res.send(data);
};