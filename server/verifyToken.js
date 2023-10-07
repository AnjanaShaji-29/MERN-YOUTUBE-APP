import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // Reading access token 
//   console.log(token);
  if (!token) return next(createError(401, "You are not authenticated!")); // Authentication not allowed message

  jwt.verify(token, process.env.JWT, (err, user) => { 
    // console.log(token);
    if (err) return next(createError(403, "Token is not valid!")); // Token not valid if present
    req.user = user; // Reading jwt object so that to use for other apicalls
    next() // Continue where we left
  });
};