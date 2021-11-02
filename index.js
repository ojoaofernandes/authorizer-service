const express = require('express');
const mapOfProducts = require('./products.json')
  .reduce((acc, p) => ({ ...acc, [p.id]: p }), {});

const app = express();
app.use(express.json());
app.use(express.json());
app.post('/checkout', (req, res) => {
  const { products } = req.body
  const items = products.map(({ id, quantity }) => ({
    id,
    quantity,
    "unit_amount": mapOfProducts[id].amount,
    "total_amount": mapOfProducts[id].amount * quantity,
    discount: 0,
    "is_gift": false
  }));

  res.send({
    "total_amount": items.reduce((acc, i) => acc + i.total_amount, 0),
    "total_amount_with_discount": items.reduce((acc, i) => acc + i.total_amount, 0),
    "total_discount": items.reduce((acc, i) => acc + i.discount, 0),
    "products": items
  });
});

app.listen(3000, () => {
  console.log(`App listening at http://localhost:3000`);
});