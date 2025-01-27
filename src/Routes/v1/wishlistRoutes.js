// const express = require('express');
// const router = express.Router();
// const wishlistController = require('../../Controller/wishlistController');

// router.post('/create-wishlist', wishlistController.addToWishlist);     
// router.post('/remove-wishlist/:id', wishlistController.removeFromWishlist);
// router.get('/get-wishlist/:userId', wishlistController.getWishlist); 

// module.exports = router;


// routes/wishlistRoutes.js
// const express = require('express');
// const router = express.Router();
// const wishlistController = require('../../Controller/wishlistController');

// router.get('/', wishlistController.getWishlist);
// router.post('/create-wishlist', wishlistController.addToWishlist);
// router.post('/remove-wishlist/:id', wishlistController.removeFromWishlist);

// module.exports = router;


let express = require("express")
const { wishlistController } = require("../../Controller")

const route = express.Router()

route.post("/create_wishlist", wishlistController.addToWishlist)
route.get("/get_wishlist/:userId", wishlistController.getWishlist)
route.get("/check_wishlist/:userId/:productId", wishlistController.checkWishlist)
route.delete("/remove_wishlist/:userId/:productId", wishlistController.removeFromWishlist)

module.exports = route 

