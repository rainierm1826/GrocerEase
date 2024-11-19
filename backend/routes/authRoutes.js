import express from "express";
import passport from "passport";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173",
    successRedirect: "http://localhost:5173",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:5173",
    successRedirect: "http://localhost:5173",
  })
);

router.get("/user", (req, res) => {
  console.log(req);
  console.log("session: ", req.session);
  console.log("user: ", req.user);
  if (req.isAuthenticated()) {
    return res.status(200).json({
      status: true,
      user: req.user,
      message: "login successfully",
    });
  }
  return res
    .status(500)
    .json({ status: false, user: null, message: "not auth" });
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ status: false, message: "logout failed" });
    }
    res.clearCookie("connect.sid");
    return res.status(200).json({ status: true, message: "logout success" });
  });
});

export default router;
