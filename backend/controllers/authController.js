const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nome, email, cpf, endereco, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({ nome, email, cpf, endereco, password: hashedPassword });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Authentication failed');
    }
    const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
