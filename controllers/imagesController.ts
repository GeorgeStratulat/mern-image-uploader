import { Router } from "express";
import { AppError } from "./../utils/appError";
import { Users } from "../models/Users";

const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, path.resolve(__dirname, "../build"));
  },
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, Date.now() + file.originalname.replace(/\s+/g, ""));
  },
});
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

export const imagesController = Router();

imagesController.post(
  "/add",
  upload.single("image"),
  async (req, res, next) => {
    if (req.session) {
      const user = await Users.findByIdAndUpdate(
        req.session.user._id,
        {
          $push: {
            images: "http://" + req.headers.host + "/" + req.file.path,
          },
        },
        { new: true, upsert: true }
      );
      if (req.session) {
        req.session.loggedIn = true;
        req.session.user = user;
        req.session.date = Date.now();
      }
      res.status(200).json(user);
    } else {
      return next(new AppError("No session token found", 402));
    }
  }
);
