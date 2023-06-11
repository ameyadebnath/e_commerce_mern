import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/loginRegisterDB")
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

//routes
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  // User.findOne({ email: email }).then((err, user) => {
  //   if (user) {
  //     if (password == user.password) {
  //       res.send({ message: "Login Successfull", user: user });
  //     } else {
  //       res.send({ message: "Password didn't match" });
  //     }
  //   } else {
  //     res.send({ message: "User not Registered" });
  //   }
  // });
  try {
    const user = await User.findOne({email:email});
    if (user) {
      console.log("user found: "+user.email+" "+user.password+" "+user)
      if (password == user.password) {
        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not Registered" });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "An error occurred" });
  }
  
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  User.findOne({ email: email })
    .then((err, user) => {
      if (user) {
        res.send({ message: "User already registerd" });
      } else {
        const user = new User({
          email: email,
          password: password,
        });
        user
          .save()
          .then((doc) => {
            res.send({ message: "Successfully Registered, Please login now." });
          })
          .catch((e) => console.log(e));
      }
    })
    .catch((e) => console.log(e));
});

app.listen(9002, () => {
  console.log("BE started at poet 9002");
});

//46.16minutes
