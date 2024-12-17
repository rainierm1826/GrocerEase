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
    failureRedirect: "https://final-project-grocerease-1.onrender.com",
    successRedirect: "https://final-project-grocerease-1.onrender.com",
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
    failureRedirect: "https://final-project-grocerease-1.onrender.com",
    successRedirect: "https://final-project-grocerease-1.onrender.com",
  })
);

router.get("/user", (req, res) => {
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

router.post("/admin/login", (req, res, next) => {
  passport.authenticate("admin", (error, admin, info) => {
    if (error) {
      return res.status(500).json({
        status: false,
        message: "Authentication error",
      });
    }

    if (!admin) {
      return res.status(401).json({
        status: false,
        message: info.message || "Invalid credentials",
      });
    }
    req.logIn(admin, (err) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Login error",
        });
      }

      return res.json({
        status: true,
        message: "Logged in successfully",
        admin: {
          email: admin.email,
        },
      });
    });
  })(req, res, next);
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
