import {Router} from 'express';
import multer from 'multer';

import uploadConfig from './Config/upload';
import  UserController from './controllers/UserController';
import ListController from './controllers/ListController';
import ProjectController from './controllers/ProjectController';
import CardController from './controllers/CardController';

const router = Router();

const userController = new UserController();
const cardController = new CardController();

const upload = multer(uploadConfig);


router.post("/cadastro", userController.execute);
router.get("/login", userController.show);
router.post("/lists", ListController.create);
router.delete("/lists", ListController.delete);
router.put("/lists", ListController.update);
router.put("/project", ProjectController.update);
router.post("/cards", upload.array('files') ,cardController.execute);
router.delete("/cards", cardController.delete);
router.put("/cards", cardController.move);
router.patch("/cards", cardController.update);

export default router;