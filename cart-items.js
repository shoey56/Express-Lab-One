const express = require("express");
const cartItems = express.Router();

const cartItemsList = [
    {id: 1, product: "snowboard and boots", price: 50, quantity: 1}, 
    {id: 2, product: "skis, poles and boots", price: 50, quantity: 1}, 
    {id: 3, product: "helmet", price: 10, quantity: 2},
    {id: 4, product: "lift pass", price: 60, quantity: 2},
    {id: 5, product: "spa pass", price: 30, quantity: 3},
    {id: 6, product: "bunny hill pass", price: 20, quantity: 3},
    {id: 7, product: "tubing pass", price: 40, quantity: 6},
    {id: 8, product: "night pass", price: 30, quantity: 2},
    {id: 9, product: "race pass", price: 0, quantity: 2},
    {id: 10, product: "group pass", price: 450, quantity: 10},
    {id: 11, product: "fancy tag", price: 3, quantity: 1},
];

cartItems.get("/", (req, res) => {
    // the actual functionality
    // go to the database
  
    // set the data from the database to a variable
    const maxPrice = req.query.maxPrice;
    const prefix = req.query.prefix;
    const pageSize = req.query.pageSize;
    // const maxPrice = 20;
    let filteredList = cartItemsList;
    if(maxPrice){
        filteredList = filteredList.filter( (rtnItem) => {
            return rtnItem.price <= maxPrice;
        });
    }
    if (prefix) {
        // search for prefix
        filteredList = filteredList.filter((rtn) => {
            return rtn.product.toLowerCase().startsWith(prefix.toLowerCase());
        });
    }

    if (pageSize){
            filteredList = filteredList.slice(0, pageSize);
    } 
    

    // transform
    res.status(200);
    res.json(filteredList);
    // res.json(cartItemsList);

  });

  cartItems.get("/:id", (req, res) => {
    const id = parseInt(req.params.id); //Make string into integer
    if(!id) {
        res.status(400);
        res.json("ID not valid");
        return;
    }
    
    const index = cartItemsList.findIndex((i) => i.id === id);
    if (index >= 0){
        res.status(200);
        res.json(cartItemsList[index]);
    } else{
        res.status(404);
        res.json("ID not found");
    }
})

let updateId = 1;
cartItems.post("/", (req,res) =>{
    let product = req.body.product;
    let price = req.body.price;
    let quantity = req.body.quantity;
    //Create Unique ID
    let id = cartItemsList.length + updateId;
    let newItem = {id, product, price, quantity};
    //Add item to cartItemsList
    cartItemsList.push(newItem);
    //Respond Status 201
    res.status(201)
    res.json(newItem);
    //
});

//   // accept PUT request at URI: /
cartItems.put("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let product = req.body.product;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let newItem = {id, product, price, quantity}
    const index = cartItemsList.findIndex((i) => i.id === id);
//     //removes 1 item from the array, starting at the index provided,
    cartItemsList.splice(index, 1, newItem);
//     // then adds newStudent in its place
//     // students.splice(index, 1, newStudent);
    res.status(200);
    res.json(newItem);

//     res.json("Updating cart..");
  });

//   // accept DELETE request at URI: /
cartItems.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    const index = cartItemsList.findIndex((i) => i.id === id);
    cartItemsList.splice(index, 1);
    updateId++;
    res.status(204);
    res.json(cartItemsList);
//     res.json("Deleting cart item..");
  });

  //  export modeule so it is useale in other files
module.exports = cartItems;
