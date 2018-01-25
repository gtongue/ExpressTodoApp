import {Router, Request, Response, NextFunction} from "express";
import {ObjectID} from "mongodb";
import Todo from "../models/todo";

class TodoRouter {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public GetTodos(req: Request, res: Response): void {
    Todo.find().then((todos) => {
      res.send({todos});
    }).catch((err) => {
      res.status(400);
      res.send(err.message);
    });
  }

  public GetTodo(req: Request, res: Response): void {
    if (!ObjectID.isValid(req.params.id)) {
      res.status(404).send("Invalid object id");
    } else {
      Todo.findById(req.params.id).then((todo) => {
        if (todo) {
            res.send({todo});
        } else {
            res.status(404);
            res.send("Todo does not exist in the database");
        }
      }, (err) => {
          res.status(400);
          res.send(err.message);
      });
    }
  }

  public CreateTodo(req: Request, res: Response): void {
    const todo = new Todo(req.body);
    todo.save().then((doc) => res.send(doc), (err) => {
      res.statusCode = 400;
      res.send(err.message);
    });
  }

  public UpdateTodo(req: Request, res: Response): void {
    // TODO
  }

  public DeleteTodo(req: Request, res: Response): void {
    if (!ObjectID.isValid(req.params.id)) {
      res.status(404).send("Invalid object id");
    } else {
      Todo.findByIdAndRemove(req.params.id).then((todo) => {
        if (todo) {
          res.send({todo});
        } else {
          res.status(404);
          res.send("No todo found with that id");
        }
      }).catch((err) => {
        res.status(400);
        res.send(err.message);
      });
    }
  }

  private routes(): void {
    this.router.get("/", this.GetTodos);
    this.router.get("/:id", this.GetTodo);
    this.router.post("/", this.CreateTodo);
    this.router.delete("/:id", this.DeleteTodo);
  }
}

export default new TodoRouter().router;
