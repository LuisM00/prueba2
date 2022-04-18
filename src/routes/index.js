const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.html', { title: 'First Web Node' });
});

router.get('/contact', (req, res) => {
  res.render('contact.html', { title: 'Contact Page' });
});

router.get('/login', (req, res) => {
  res.render('login.html', { title: 'Login Page' });
});

router.get('/register', (req, res) => {
  res.render('register.html', { title: 'Register Page' });
});

router.get('/information', (req, res) => {
  res.render('information.html', { title: 'Information Page' });
});

router.get('/catalogo', (req, res) => {
  res.render('catalogo.html', { title: 'Information Page' });
});


module.exports = router;
