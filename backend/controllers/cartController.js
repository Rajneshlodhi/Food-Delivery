import userModel from "../models/userModel.js"

//add items to user cart


const addToCart = async (req, resp) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    // If no user found
    if (!userData) {
      return resp.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Initialize if undefined

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    resp.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ success: false, message: "Server error" });
  }
};



//remove items from Cart
const removeToCart =async(req, resp)=>{
    try {
        let userData= await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        resp.json({success:true , message:"Removed From Data"})
    } catch (error) {
        console.log(error)
        resp.json({success:false , message:"Error"})
    }

}


//fetch user cart data

const getCart = async(req, resp)=>{
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    resp.json({success:true ,cartData})
  } catch (error) {
    console.log(error)
    resp.json({success:false , message:"Error"})
  }

}


export{addToCart, removeToCart, getCart}