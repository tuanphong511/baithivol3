import fs from "fs";
import qs from "qs";
import bikeService from "../service/bikeService.js";
import url from "url";


class BikeController {
    showAll(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end', () => {
            if (req.method === 'GET') {
                showList(req, res);
            } else {
                data = qs.parse(data);
                bikeService.save(data).then(() =>{
                    showList(req, res);
                })

            }
        })
    }
    edit(req, res) {
        let data = '';
        req.on('data', dataRaw => {

            data += dataRaw;
        })
        req.on('end', () => {
            let urlObject = url.parse(req.url, true)
            if (req.method === 'GET') {
                fs.readFile('view/bike/edit.html', 'utf-8', (err, stringHTML) => {
                    bikeService.findById(urlObject.query.idEdit).then((bike) => {
                        stringHTML = stringHTML.replace('{id}', bike.id);
                        stringHTML = stringHTML.replace('{name}', bike.name);
                        stringHTML = stringHTML.replace('{numberControl}', bike.numberControl);
                        stringHTML = stringHTML.replace('{cc}', bike.cc);
                        res.write(stringHTML);
                        res.end();
                    });
                })
            } else {
                data = qs.parse(data);
                bikeService.update(data).then(() => {
                    res.writeHead(301, {'location': '/bikes'})
                    res.end()
                });
            }
        })
    }
    showFormAdd(req, res) {
        fs.readFile('view/bike/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }
    delete(req, res) {
        if (req.method === 'GET') {
            let urlObject = url.parse(req.url, true);
            bikeService.delete(urlObject.query.idDelete).then(() => {
                res.writeHead(301, {'location': '/bikes'})
                res.end()
            })
        }
    }


}
function showList(req, res) {
    fs.readFile('view/bike/list.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        const urlObject = url.parse(req.url,true)
        const keyword = urlObject.query.keyword ?? ""
        bikeService.findAll(keyword).then((bikes) =>{
            for (const bike of bikes) {
                str += `<h2>${bike.id}. '${bike.name}': ${bike.numberControl}.  '${bike.cc}' <button>
                <a href="/edit-bike?idEdit=${bike.id}">Edit</a></button>
                <a onclick="return confirm('Bạn có chắc chắn muốn xóa không?')"
                             href="/delete-bike?idDelete=${bike.id}">
                                    <button>Delete</button> </a>;
                 </h2>`;
            }
            stringHTML = stringHTML.replace('{list}', str)
            stringHTML = stringHTML.replace("{keyword}", keyword)
            res.write(stringHTML);
            res.end();
        })
    })

}
export default new BikeController();