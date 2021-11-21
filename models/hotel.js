const mongoose = require("mongoose");
const Review = require('./review');
const { Schema } = mongoose;

const HotelSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

//delete all reviews when one particular hotel is deleted 
HotelSchema.post('findOneAndDelete', async function(doc){
  if (doc){
    await Review.deleteMany({
      _id : {
        $in : doc.reviews
      }
    })
  }
})

module.exports = mongoose.model("Hotel", HotelSchema);
