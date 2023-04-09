const mongoose = require("mongoose");
// const { user } = useSelector((state) => state.user);

const productSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  availability: {
    type: String,
    required: [true, "Please Enter product Availability Status"],
    trim: true,
    // default: "Available",
  },
  // availableDates: {
  //   type: [Date],
  //   default: [],
  // },
  calendar: {
    type: [
      {
        date: { type: Date },
        isBooked: { type: Boolean, default: false },
      },
    ],
    default: [],
  },

  // pre: {
  //   date: {
  //     type: Date,
  //     required: true,
  //   },
  //   available: {
  //     type: Boolean,
  //     required: true,
  //     default: true,
  //   },
  // },
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  availableDates: [
    {
      date: {
        type: Date,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  // Stock: {
  //   type: Number,
  //   required: [true, "Please Enter product Stock"],
  //   maxLength: [4, "Stock cannot exceed 4 characters"],
  //   default: 1,
  // },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
