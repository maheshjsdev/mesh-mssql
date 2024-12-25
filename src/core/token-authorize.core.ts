import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/environment.config";

const JWT_SECRET = `${ENV.JWTSECRET}`;

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Token missing or invalid" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as string | JwtPayload;
    req.body.user = decoded; // Attach the decoded token to req.user
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
