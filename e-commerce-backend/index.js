import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

var bankid = ""//bank id of ecommerce website

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
  bankid: {
    type: String,
    default: "",
  },
});

const User = new mongoose.model("User", userSchema);

//pending orders of bank
const pendingOrderSchema = new mongoose.Schema({
  totalPrice: Number,
  userId: String,
  bankId: String,
  orderedItems: [
    {
      id: Number,
      image: String,
      title: String,
      price: String,
      quantity: Number
    }
  ]
});

const PendingOrder = mongoose.model('PendingOrder', pendingOrderSchema);

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

app.post("/updatebankinfo", async (req, res) => {
  const { email, bankid } = req.body;
  console.log("Email and bankId: "+email+" "+bankid);
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { bankid: bankid },
      { new: true, upsert: true }
    );
    if (user) {
      res.send({ message: "User info updated with bank info", success:1});
    } else {
      res.send({ message: "No user found",success:0 });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "An error occurred", success:0 });
  }
});

app.post("/placeOrder", async (req, res) => {
  const { orders, userId } = req.body;
  
  try {
    // Fetch the user's bank information
    const user = await User.findById(userId);
    if (!user) {
      return res.send({ message: "User not found",success:0 });
    }
    
    // Calculate the total price of all orders
    let totalPrice = 0;
    orders.forEach((order) => {
      const price = parseFloat(order.price);
      const quantity = parseInt(order.quantity);
      totalPrice += price * quantity;
    });

    // Transfer the money to the e-commerce bank account
    const transferData = {
      fromBankId: user.bankid,
      toBankId: bankid, // Assuming you have the e-commerce bank ID stored in the "bankid" variable
      amount: totalPrice,
    };

    // Call the bank API to transfer the money
    const transferResponse = await axios.post("http://localhost:9003/transfer", transferData);
    if (transferResponse.data.success !== 1) {
      return res.send({ message: transferResponse.data.message, success:0 });
    }

    // Create a new pending order
    const newOrder = new PendingOrder({
      totalPrice: totalPrice,
      userId: user._id,
      bankId: user.bankid,
      orderedItems: orders,
    });
    await newOrder.save();

    return res.send({ message: "Order placed successfully", success:1});
  } catch (error) {
    console.log(error);
    res.send({ message: "An error occurred",success:0 });
  }
});

app.listen(9002, () => {
  console.log("BE started at poet 9002");
});

//46.16minutes
//getting bankid of e-commerce website
    axios
      .post("http://localhost:9003/addbankinfo", { accountno: "ecommerce", secretkey: "ecommerce"})
      .then((res) => {
        console.log(res.data);
        bankid=res.data.user._id;
        console.log("received bank id of ecommerce "+bankid)
      });