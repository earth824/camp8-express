const express = require('express');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const app = express();

// app.use((req, res) => {
//   res.status(500).send('<h1>Hello Express</h1>');
// });

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Express API' });
});

app.post('/', (req, res) => {
  res.status(200).send('<h1>Hello My Post method</h1>');
});

app.post('/login', (req, res) => {
  const { path, method } = req;
  res.status(200).json({ path: path.slice(1), method });
});

app.post('/register', (req, res) => {
  const { path, method } = req;
  res.status(200).json({ path: path.slice(1), method });
});

app.get('/user', (req, res) => {
  const { path, method } = req;
  res.status(200).json({ path: path.slice(1), method });
});

app.put('/user', (req, res) => {
  const { path, method } = req;
  res.status(200).json({ path: path.slice(1), method });
});

app.delete('/user', (req, res) => {
  const { path, method } = req;
  res.status(200).json({ path: path.slice(1), method });
});

app.get('/product', async (req, res) => {
  try {
    const { method } = req;
    const message = getMessage(method);
    const data = await readFile('./count.json', 'utf8');
    const count = JSON.parse(data);
    count[method] += 1;
    await writeFile('./count.json', JSON.stringify(count));
    res.status(200).json({ message: message, method: method, count: count[method] });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }

  // fs.readFile('./count.json', 'utf8', (err, data) => {
  //   if (err) {
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   } else {
  //     const count = JSON.parse(data);
  //     count[method] += 1;
  //     fs.writeFile('./count.json', JSON.stringify(count), err => {
  //       if (err) {
  //         res.status(500).json({ message: 'Internal Server Error' });
  //       } else {
  //         res.status(200).json({ message: message, method: method, count: count[method] });
  //       }
  //     });
  //   }
  // });
});

app.post('/product', (req, res) => {
  const { method } = req;
  const message = getMessage(method);
  fs.readFile('./count.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      const count = JSON.parse(data);
      count[method] += 1;
      fs.writeFile('./count.json', JSON.stringify(count), err => {
        if (err) {
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(200).json({ message: message, method: method, count: count[method] });
        }
      });
    }
  });
});

app.put('/product', (req, res) => {
  const { method } = req;
  const message = getMessage(method);
  fs.readFile('./count.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      const count = JSON.parse(data);
      count[method] += 1;
      fs.writeFile('./count.json', JSON.stringify(count), err => {
        if (err) {
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(200).json({ message: message, method: method, count: count[method] });
        }
      });
    }
  });
});

app.delete('/product', (req, res) => {
  const { method } = req;
  const message = getMessage(method);
  fs.readFile('./count.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      const count = JSON.parse(data);
      count[method] += 1;
      fs.writeFile('./count.json', JSON.stringify(count), err => {
        if (err) {
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(200).json({ message: message, method: method, count: count[method] });
        }
      });
    }
  });
});

function getMessage(method) {
  let message = '';
  if (method === 'POST') message = 'Create';
  else if (method === 'GET') message = 'Read';
  else if (method === 'PUT') message = 'Update';
  else if (method === 'DELETE') message = 'Delete';
  message += ' Product';
  return message;
}

const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
