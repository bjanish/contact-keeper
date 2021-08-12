const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Invalid email address').isEmail(),
    check('password', 'Invalid password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: ['User not found'] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: ['Invalid password'] });
      }
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
      return res.status(500).json({ msg: ['Server error'] });
    }
  }
);

module.exports = router;
