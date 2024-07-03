import express, { Router } from "express";
import * as bcrypt from "bcryptjs";

export const auth = Router();
auth.use(express.json());

auth.get("/currentUser", (req, res) => {
  if (!req.session || !req.session["user"]) {
    res.status(401).send("Not logged in");
    return;
  }
  res.json(req.session["user"]);
});

auth.post("/logIn", async (req, res) => {
  const { user, password } = req.body;
  try {
    const isPwdCorrect = await checkPassword(user.password, password);

    if (!isPwdCorrect) {
      return res.status(401).send("Incorrect password");
    }
    req.session!["user"] = user;
    return res.json(user);
  } catch (error) {
    return res.status(500).send("Error Login User Please NOT  LOGGED IN");
  }
});

// sign  out
auth.post("/signOut", (req, res) => {
  if (!req.session || !req.session["user"]) {
    res.status(401).send("Not logged in");
    return;
  }
  delete req.session!["user"];
  res.json({ message: "Logged out" });
});

function checkPassword(
  storedPassword: string,
  intentPassword: string
): Promise<boolean> {
  return bcrypt.compare(storedPassword, intentPassword);
}
