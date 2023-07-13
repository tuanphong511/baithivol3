import fs from 'fs'
import bikeRouter from "./bikeRouter.js";
import homeController from "../controller/homeController.js";

let router = {
    '/': homeController.showIndex,
    '/err': homeController.showErr,
}

router = {...router, ...bikeRouter};
export default router;