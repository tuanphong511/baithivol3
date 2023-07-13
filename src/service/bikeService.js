import connection from "../connection.js";


class bikeService{
    constructor() {
        connection.connecting();
    }
    findAll(keyword) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from bike where id like '%${keyword}%' or name like '%${keyword}%'`, (err,bikes) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(bikes)
                    resolve(bikes)
                }
            })
        })
    }

    save(bike) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`INSERT INTO bike VALUES (${bike.id}, "${bike.name}", ${bike.numberControl}, ${bike.cc})`, (err,data) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('Them thanh cong')
                    resolve(data)
                }
            })
        })
    }
    findById(id){
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from bike where id = ${id}`, (err,bike) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(bike)
                    resolve(bike[0])
                }
            })
        })
    }
    update(bike) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(

                `update bike
                        set     
                        id  = ${bike.id},
                        name = '${bike.name}', 
                        numberControl= '${bike.numberControl}', 
                        cc = ${bike.cc}
                    where id = ${bike.id}`, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)

                    }
                })
        })

    }
    delete(idDelete) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`DELETE FROM bike WHERE id = ${idDelete}`, (err, delBike) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(delBike);
                }
            });


        });
    }
}
export default new bikeService()