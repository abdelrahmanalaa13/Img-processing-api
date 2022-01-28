import { Response, Request } from "express";
import { promises as fs } from "fs";
import * as express from 'express';
import * as  path from 'path';

const imgListRouter = express.Router();

imgListRouter.get(
  "/",
  async (request: Request, response: Response): Promise<void> => {
    const imgsPath = `${path.resolve(__dirname, "../../../assets/imgs")}`;
    let imgs: string[] | null;
    try {
      imgs = await fs.readdir(imgsPath);
    } catch (error) {
      response.status(500).send("Error on loading the images");
      imgs = null;
      return;
    }
    response.status(200).send(imgs.join("<br />"));
  }
);

export default imgListRouter;
