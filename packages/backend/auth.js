import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import services from "./services.js"; //eslint-disable-line

const creds = [];

dotenv.config();

export function registerUser(req, res) {
  const { username, pwd } = req.body; // from form
  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    services.getUser(username).then((existingUser) => {
      console.log(existingUser);
      if (existingUser.length !== 0) {
        res.status(409).send("Username already taken");
      } else {
        bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(pwd, salt))
          .then((hashedPassword) => {
            generateAccessToken(username).then((token) => {
              console.log("Token:", token);
              res.status(201).send({ token });
              // Add the new user to the database
              services
                .addUser({ username, password: hashedPassword })
              console.log("added");
            });
          });
      }
    });
  }
}

export function loginUser(req, res) {
  const { username, pwd } = req.body; // from form
  // const retrievedUser = services.getUser(
  //   (c) => c.username === username
  // );
  services.getUser(username)
    .then((retrievedUser) => {
      retrievedUser = retrievedUser[0];
      if (!retrievedUser) {
        res.status(401).send("Unauthorized");
      } else {
        bcrypt
          .compare(pwd, retrievedUser.password)
          .then((matched) => {
            if (matched) {
              generateAccessToken(username)
                .then((token) => {
                  res.status(200).send({ token });
                });
            } else {
              res.status(401).send("Unauthorized");
            }
          })
          .catch(() => {
            res.status(401).send("Unauthorized");
          });
      }
    })
    .catch(() => {
      res.status(401).send("Unauthorized");
    });
}

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      },
    );
  });
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  // Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (decoded) {
        req.username = decoded.username;
        next();
      } else {
        console.log("JWT error:", error);
        res.status(401).end();
      }
    });
  }
}
