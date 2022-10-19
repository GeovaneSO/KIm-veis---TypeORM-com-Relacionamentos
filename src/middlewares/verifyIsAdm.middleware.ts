import { Request, Response, NextFunction } from "express";
import { AppError, handleError } from "../errors/appErrors";

const verifyIsAdm = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const isAdm = req.user.isAdm;

    if(!isAdm){throw new AppError(403, 'User is not Adm')};

    next();
  } catch(error){
    if(error instanceof AppError){
        handleError(error, res)
    }
  }
};

export default verifyIsAdm;