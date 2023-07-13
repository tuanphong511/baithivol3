import fs from 'fs'
import bikeService from "../service/bikeService.js";
import bikeController from "../controller/bikeController.js";



let bikeRouter = {
    '/bikes': bikeController.showAll,
    '/add-bike': bikeController.showFormAdd,
    '/edit-bike': bikeController.edit,
    '/delete-bike': bikeController.delete,
}

export default bikeRouter