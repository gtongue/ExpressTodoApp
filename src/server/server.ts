import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as mongoose from "mongoose";
import * as logger from "morgan";

import TodoRouter from "./routers/todoRouter";

class Server {
  public app: express.Application;

  constructor(){
    this.app = express();
    this.config();
    this.routes();
  }

  public config(): void {
    // mongoose.Promise = global.Promise;;
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/TodoApp").then(() => {
      console.log("Connected to mongodb");
    }, (err) => {
      console.error("Problem connecting to mongodb database", err.message);
    });

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(logger("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  public routes(): void {
    let router: express.Router;
    router = express.Router();

    // this.app.use('/', router);
    this.app.use("/api/todos", TodoRouter);
    // this.app.use('/api/todos')
  }

}

export default new Server().app;
