import express from 'express';
import { BandController } from '../controller/BandController';

export const bandRouter = express.Router();

const bandControler = new BandController();

bandRouter.post("/signup", bandControler.signup);