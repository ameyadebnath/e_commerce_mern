import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";

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

//pending orders of bank
const completedOrderSchema = new mongoose.Schema({
  totalPrice: Number,
  userId: String,
  bankId: String,
  dateoforder: String,
  dateofaccpted: {
    type: String,
    default: new Date().toLocaleDateString()
  },
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

const CompletedOrder = mongoose.model('CompletedOrder', completedOrderSchema);

var bankid = ""

app.get("/bankid", (req, res) => {
  res.json({ bankId: bankid });
});

app.post("/completeOrder", async (req, res) => {
  const { orderId } = req.body;

  try {
    // Use API to delete the pending order with the given order ID
    const deletePendingOrderResponse = await axios.post("http://localhost:9002/deletePendingOrder/", {orderId: orderId});
    const deletePendingOrderData = deletePendingOrderResponse.data;

    if (deletePendingOrderData.success !== 1) {
      return res.send({ message: "Failed to delete pending order", success: 0 });
    }

    const deletedOrder = deletePendingOrderData.deletedOrder;

    // Create a new entry in the CompletedOrder schema using the deleted order data
    const newCompletedOrder = new CompletedOrder({
      totalPrice: deletedOrder.totalPrice,
      userId: deletedOrder.userId,
      bankId: deletedOrder.bankId,
      dateoforder: deletedOrder.date,
      orderedItems: deletedOrder.orderedItems,
    });

    await newCompletedOrder.save();

    return res.send({ message: "Order completed successfully", success: 1 });
  } catch (error) {
    console.log(error);
    return res.send({ message: "An error occurred", success: 0 });
  }
});

app.get("/completedOrders", async (req, res) => {
  try {
    const completedOrders = await CompletedOrder.find();
    return res.send({ completedOrders, success: 1 });
  } catch (error) {
    console.log(error);
    return res.send({ message: "An error occurred", success: 0 });
  }
});

app.post('/getCompletedOrders', async (req, res) => {
  const { userId } = req.body;

  try {
    const completedOrders = await CompletedOrder.find({ userId: userId });
    res.send({ completedOrders: completedOrders, success: 1 });
  } catch (error) {
    console.log(error);
    res.send({ message: 'An error occurred', success: 0 });
  }
});

app.listen(9004, () => {
  console.log("Bank server started at poet 9004");
});

//46.16minutes
//getting bankid of e-commerce website
axios
.post("http://localhost:9003/addbankinfo", { accountno: "supplier", secretkey: "supplier"})
.then((res) => {
  console.log(res.data);
  bankid=res.data.user._id;
  console.log("received bank id of ecommerce "+bankid)
});
