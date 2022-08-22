const express = require('express');
const { createHash, randomBytes } = require('crypto');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const hash = (password) => {
  const salt = randomBytes(8).toString('hex');
  const hashedPassword = createHash('sha256').update(password).digest('hex');

  return salt + '.' + hashedPassword;
};

app.post('/password-hasher', (req, res) => {
  const { hashPassword } = req.body;
  const hashedPassword = hash(hashPassword);

  console.log(hashedPassword);
  res.send(hashedPassword);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening to ${PORT}`));
