import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';

dotenv.config();

const jwtAuth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'No token provided.',
      error: 'MISSING_TOKEN'
    });
  }

  const tokenParts = token.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Invalid token format.',
      error: 'INVALID_TOKEN_FORMAT'
    });
  }

  const jwtToken = tokenParts[1];

  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Invalid token.',
        error: 'INVALID_TOKEN'
      });
    }

    req.user = decoded;
    next();
  });
};

export default jwtAuth;