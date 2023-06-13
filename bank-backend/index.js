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
  accountno: String,
  secretkey: String,
  balance: {
    type: Number,
    default: 1000000
  }
});

const User = new mongoose.model("bankuser", userSchema);

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

app.post("/addbankinfo", async (req, res) => {
  const { accountno, secretkey } = req.body;
  console.log("Account no and secret key: " + accountno + " " + secretkey);

  try {
    var user = await User.findOne({ accountno: accountno });
    if (user) {
      res.send({ message: "User already registered", success:0 });
    } else {
      const newUser = new User({
        accountno: accountno,
        secretkey: secretkey,
        balance: 1000000,
      });
      await newUser.save();
      user = await User.findOne({ accountno: accountno });
      res.send({ message: "Successfully Registered, Please login now.", success: 1, user:user });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "An error occurred", success:0 });
  }
});


app.listen(9003, () => {
  console.log("Bank server started at poet 9003");
});

//46.16minutes
