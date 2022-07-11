import express from 'express';
import { ShowController } from '../controller/ShowController';

export const showRouter = express.Router();

const showController = new ShowController();

showRouter.post("/signup", showController.signup);
showRouter.get("/list/:weekDay", showController.getShowsByWeekDay);