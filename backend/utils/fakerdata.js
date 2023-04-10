const faker = require('faker');
const Product = require('../models/productModel');

const createDummyData = async () => {
  const products = [];

  for (let i = 0; i < 10; i++) {
    const product = {
      userId: faker.datatype.uuid(),
      availability: faker.random.boolean() ? 'Available' : 'Unavailable',
      calendar: [],
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      ratings: faker.random.number({ min: 0, max: 5 }),
      images: [
        {
          public_id: faker.datatype.uuid(),
          url: faker.image.imageUrl(),
        },
      ],
      availableDates: [
        {
          date: faker.date.between('2023-01-01', '2023-12-31'),
        },
      ],
      category: faker.commerce.department(),
      numOfReviews: faker.random.number({ min: 0, max: 100 }),
      reviews: [],
    };

    products.push(product);
  }

  await Product.create(products);
};

createDummyData();


