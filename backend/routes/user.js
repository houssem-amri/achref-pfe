const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
var cloneDeep = require("lodash.clonedeep");

const User = require("../models/user");

const router = express.Router();
const jwtConfig = {
  secret: "some-secret-code-goes-here",
  expiresIn: "2 days", // A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc)
};
// cofiguration d'image
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-device-" + "." + extension;
    cb(null, imgName);
  },
});

router.post(
  "/add_users",
  multer({ storage: storage }).single("avatar"),
  async (req, res, next) => {
    url = req.protocol + "://" + req.get("host");
    const email_user = await User.findOne({ email: req.body.email });
    if (email_user) {
      res.status(200).json({
        message: "email existe",
      });
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const usres = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          role: req.body.role,
          avatar: url + "/images/" + req.file.filename,
          dateCreated: Date.now(),
        });
        usres
          .save()
          .then(
            res.status(200).json({
              message: "User added succesful",
            })
          )
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      });
    }
  }
);

router.post("/auth", (req, res, next) => {
  console.log("req.body", req.body);
  let error = [];
  let fetchedUser;
  let user;
  User.findOne({ email: req.body.data.email })
    .then((user) => {
      if (!user) {
        error.push({ type: "email", message: "Check your email address" });
        return res.status(200).json({
          error: error,
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.data.password, user.password);
    })
    .then((result) => {
      if (!result) {
        error.push({ type: "password", message: "Check your password" });

        return res.status(200).json({
          error: error,
        });
      }
      const token = jwt.sign({ id: fetchedUser._id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,
      });

      user = {
        uuid: fetchedUser._id,
        role: fetchedUser.role,
        from: "custom-db",
        data: {
          displayName: fetchedUser.name,
          email: fetchedUser.email,
          photoURL: fetchedUser.avatar,
          settings: {
            layout: {
              style: "layout1",
              config: {
                scroll: "content",
                navbar: {
                  display: true,
                  folded: true,
                  position: "left",
                },
                toolbar: {
                  display: true,
                  style: "fixed",
                  position: "below",
                },
                footer: {
                  display: true,
                  style: "fixed",
                  position: "below",
                },
                mode: "fullwidth",
              },
            },
            customScrollbars: true,
            theme: {
              main: "defaultLight",
              navbar: "defaultLight",
              toolbar: "defaultLight",
              footer: "defaultLight",
            },
          },
          shortcuts: ["Scrumboard"],
        },
      };
      res.status(200).json({
        access_token: token,
        user: user,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
});

router.get("/get_staff", (req, res, next) => {
  User.find({ role: "staff" }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        data: findedObject,
      });
    }
  });
});

router.post("/auth/access-token", async (req, res, next) => {
  const access_token = req.body.data.access_token;

  try {
    const { id } = jwt.verify(access_token, jwtConfig.secret);
    const findeduser = await User.findOne({ _id: id });

    delete findeduser.password;

    const updatedAccessToken = jwt.sign({ id: findeduser._id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
    const user = {
      uuid: findeduser._id,
      role: findeduser.role,
      from: "custom-db",
      data: {
        displayName: findeduser.name,
        email: findeduser.email,
        photoURL: findeduser.avatar,
        settings: {
          layout: {
            style: "layout1",
            config: {
              scroll: "content",
              navbar: {
                display: true,
                folded: true,
                position: "left",
              },
              toolbar: {
                display: true,
                style: "fixed",
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
                position: "below",
              },
              mode: "fullwidth",
            },
          },
          customScrollbars: true,
          theme: {
            main: "defaultLight",
            navbar: "defaultLight",
            toolbar: "defaultLight",
            footer: "defaultLight",
          },
        },
        shortcuts: ["Scrumboard"],
      },
    };
    res.status(200).json({
      user,
      access_token: updatedAccessToken,
    });
  } catch (e) {
    const error = "Invalid access token detected";
    res.status(200).json([401, { error }]);
  }
});
router.get("/get_admin", (req, res, next) => {
  User.find({ role: "admin" }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        data: findedObject,
      });
    }
  });
});

//delete Staff
router.delete("/delete_staff/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: "deleted succ",
    })
  );
});

router.get("/getStafById/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        data: findedObject,
      });
    }
  });
});
router.put("/update_users", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const usres = {
      _id: req.body._id,
      name: req.body.name,
      email: req.body.email,
      password: hash,
      role: req.body.role,
      avatar:
        req.body.role === "admin"
          ? "assets/images/avatars/Velazquez.jpg"
          : "assets/images/avatars/Abbott.jpg",

      dateCreated: req.body.dateCreated,
    };
    User.updateOne({ _id: req.body._id }, usres)
      .then(
        res.status(200).json({
          message: "User updatetd succesful",
        })
      )
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

module.exports = router;
