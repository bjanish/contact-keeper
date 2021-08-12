const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route   POST api/users
// @desc    Create a new user
// @access  Public
router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: ['Email already exists'] });
      }
      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // return res.status(201).json({ msg: ['User created'] });
      // // res.send('User saved');
      const payload = { user: { id: user._id } };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: '1h',
        },
        (err, token) => {
          if (err) {
            return res.status(500).json({ msg: ['Error generating token'] });
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    }
  }
);

module.exports = router;
