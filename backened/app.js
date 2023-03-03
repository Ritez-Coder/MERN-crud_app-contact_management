const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const { Schema } = mongoose;
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/mern")
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => console.log(err));

const contactsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  label: {
    type: String,

    default: "Friend",
  },
});

// creating new collection
const contacts = new mongoose.model("contacts", contactsSchema);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/contacts", async (req, res) => {
  const { name, phone, label } = req.body;
  try {
    const data = new contacts({name , phone , label});
    const inserted_data = await data.save();
    res.status(201).send(`successfully saved ${inserted_data}`);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const getContacts = await contacts.find({});
    res.status(200).send(getContacts);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/contacts/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const getContact = await contacts.findById({ _id });
    res.status(200).json(getContact);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/contacts/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getMen = await contacts.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).send(getMen);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/contacts/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getContact = await contacts.findByIdAndDelete({ _id });
    res.send(getContact);
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

