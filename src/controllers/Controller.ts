import { NextFunction, Request, Response } from "express";
import { container, InjectionToken } from "tsyringe";

export abstract class Controller {
  abstract handle(req: Request, res: Response): Promise<void>;

  static attachToRouteHandler(controllerName: InjectionToken) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const controller = container.resolve<Controller>(controllerName);
        await controller.handle(req, res);
      } catch (err) {
        next(err);
      }
    };
  }
}