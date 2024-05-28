import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function registerUser(req, res) {
  const { username, pwd } = req.body; // from form

  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else if (creds.find((c) => c.username === username)) {
    res.status(409).send("Username already taken");
  } else {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(pwd, salt))
      .then((hashedPassword) => {
        generateAccessToken(username).then((token) => {
          console.log("Token:", token);
          res.status(201).send({ token: token });
          creds.push({ username, hashedPassword });
        });
      });
  }
}

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
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
