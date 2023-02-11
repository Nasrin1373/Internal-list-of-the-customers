const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const customers = [];

app.post('/customers/login', (req, res) => {
  const { name, email } = req.body;

  const customer = {
    name,
    email,
    checkedIn: true,
    losses: [],
  };

  customers.push(customer);

  res.send({
    message: `Customer ${name} logged in successfully`,
    customer,
  });
});

app.post('/customers/checkout', (req, res) => {
  const { email } = req.body;

  const customerIndex = customers.findIndex(c => c.email === email);

  if (customerIndex === -1) {
    return res.status(400).send({
      error: 'Customer not found',
    });
  }

  const customer = customers[customerIndex];
  customer.checkedIn = false;

  res.send({
    message: `Customer ${customer.name} checked out successfully`,
    customer,
  });
});

app.post('/customers/loss', (req, res) => {
  const { email, loss } = req.body;

  const customerIndex = customers.findIndex(c => c.email === email);

  if (customerIndex === -1) {
    return res.status(400).send({
      error: 'Customer not found',
    });
  }

  const customer = customers[customerIndex];
  customer.losses.push(loss);

  res.send({
    message: `Loss/damage reported for customer ${customer.name}`,
    customer,
  });
});

app.get('/customers', (req, res) => {
  res.send({
    customers,
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening on port 3000...");
});
