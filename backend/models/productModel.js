const mongoose = require("mongoose");
// const { user } = useSelector((state) => state.user);

const productSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  payment: {
    type: Number,
  },
  Cluster: {
    type: Number,
    required: true,
    default: 0,
  },
  archive: {
    type: String,
    // required: [true, "Mark it as archive or not archive"],
    trim: true,
    default: "Not Archived",
  },

  premium: {
    type: String,
    default: "Not Premium",
  },
  payment: {
    type: Number,
  },

  // premium: {
  //   type: Boolean,
  //   default: false,
  // },
  // payment: {
  //   type: Number,
  //   // required: [true, "Please provide a payment value."],
  //   min: 0,
  // },
  // calendar: {
  //   type: [
  //     {
  //       date: { type: Date },
  //       isBooked: { type: Boolean, default: false },
  //     },
  //   ],
  //   default: [],
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
  im: {
    type: String,
    required: true,
    default:
      "E:myworksem8WTAssignment2 bsFlexStart (1)FlexStartassetsimgportfolioportfolio-2.jpg",
  },
  images: [
    {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
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
  notifyMe: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      sent: {
        type: Boolean,
        default: false,
      },
      info: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
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
