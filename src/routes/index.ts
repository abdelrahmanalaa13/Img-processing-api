import imgListRouter from "./api/imgListRouter";
import * as express from 'express';
import imgRouter from "./api/imgRouter";

const routes = express.Router();

routes.use("/imgList", imgListRouter);
routes.use("/imgs", imgRouter);
export default routes;
