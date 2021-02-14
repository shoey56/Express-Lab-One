const express = require("express");
const cartItems = require("./cart-items");

const app = express();

app.use(express.json());

const port = 2300;

app.use("/cart-items", cartItems)

app.listen(port, () => console.log(`Listening on port: ${port}.`));

console.log("http://localhost:" + port + "/cart-items");