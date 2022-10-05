const express = require('express')
const { createBitCard,updateBitCard,deleteCard,getCardById} = require("../Controllers/CardModel")


const Card = express.Router();

Card.route("/create").post(createBitCard);
Card.route("/update/:id").put(updateBitCard);
Card.route("/delete").delete(deleteCard);
Card.route("/get/:id").get(getCardById);



module.exports = Card;