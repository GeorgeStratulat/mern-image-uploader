import { Request, Response, NextFunction, Router } from "express";
import crypto from "crypto";
import { controller, use, catchAsync, post, get, patch } from "../decorators";
import { Users } from "../models/Users";
import { AppError } from "./../utils/appError";
import { bodyValidator } from "../middlewares/bodyValidator";
import { requireAuth } from "../middlewares/requireAuth";
import { Email } from "../utils/Email";

export const authRoute = Router();

// commented out password in user model
@controller("/auth", authRoute)
class UserController {
  @get("/isloggedin")
  isLoggedIn(req: Request, res: Response) {
    if ((req.session && !req.session.loggedIn) || !req.session) {
      res.status(200).json(false);
    } else {
      res.status(200).json(req.session.user);
    }
  }

  @post("/login")
  @use(bodyValidator("email", "password"))
  @catchAsync
  async login(req: Request, res: Response, next: NextFunction) {
    interface ReqBody {
      email: string;
      password: string;
    }
    const { email, password }: ReqBody = req.body;

    // Password by default is not selected
    let user = await Users.findOne({ email }).select("+password");

    // If user's account has been deactivated by user, reactivate it.
    if (!user) {
      const activateUser = await Users.updateOne({ email }, { active: true });
      // Only search user if user exist
      if (activateUser.n)
        user = await Users.findOne({
          email,
        }).select("+password");
    }

    // Add to session
    // any type need to fix
    if (req.session) {
      req.session.loggedIn = true;
      req.session.user = user;
      req.session.date = Date.now();
    }

    res.status(200).json(user);
  }

  @get("/logout")
  async logout(req: Request, res: Response, next: NextFunction) {
    if (req.session)
      req.session.destroy((err: Error) => {
        if (err) return next(err);
        res.clearCookie("sid");
        res.status(200).send("User logged out");
      });
  }
}
