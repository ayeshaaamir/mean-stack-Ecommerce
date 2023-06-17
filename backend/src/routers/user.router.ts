import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", (req, res) => {
  //destructuring assignments
  const { email, password } = req.body;
  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(400).send("Incorrect username or password");
  }
});
// token --> encrypted text which will be send to the client and will be save there so that the client should send it with each
// request and the server could decrypt it and understand that which user is sending the request(authentication and authorization)

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "SomeRandomText",
    {
      expiresIn: "30d",
    }
  );
  user.token = token;
  return user;
};

export default router;
