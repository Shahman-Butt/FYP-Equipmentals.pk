db.products.insertOne({
  userId: ObjectId("643051bfabb3593304c5b650"),
  availability: "Available",
  calendar: [
    { date: new Date("2022-04-07"), isBooked: false },
    { date: new Date("2022-04-08"), isBooked: true },
    { date: new Date("2022-04-09"), isBooked: false },
  ],
  name: "Product 1",
  description: "This is a sample product",
  price: 99.99,
  ratings: 4.5,
  images: [
    {
      public_id: "avatars/ocll7srsqnoyyydd6yb2",
      url: "https://res.cloudinary.com/dxtgxmjek/image/upload/v1680870803/avatars/ocll7srsqnoyyydd6yb2.png",
    },
    {
      public_id: "avatars/ocll7srsqnoyyydd6yb2",
      url: "https://res.cloudinary.com/dxtgxmjek/image/upload/v1680870803/avatars/ocll7srsqnoyyydd6yb2.png",
    },
  ],
  category: "Electronics",
  numOfReviews: 10,
  reviews: [
    {
      user: ObjectId("643051bfabb3593304c5b650"),
      name: "John Doe",
      rating: 4,
      comment: "This product is awesome",
    },
    {
      user: ObjectId("64300d934c72cd3500bf0841"),
      name: "Jane Doe",
      rating: 5,
      comment: "I love this product",
    },
  ],
  createdAt: new Date("2022-04-06T10:00:00Z"),
});
