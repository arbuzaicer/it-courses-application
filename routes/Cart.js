const { Router } = require('express');
const cart = require('../models/cart');
const courses = require('../models/course');

const router = Router();

router.get('/', async (req, res) => {
   res.status(200);
   const cartData = await cart.getData();
   const { courses, price } = cartData;
   res.render('cart', {
       title: 'Shopping cart', courses, price
   })
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const cartData = await cart.remove(id);
    res.status(200).json(cartData);

})

router.post('/add', async (req, res) => {
    res.status(200);
    const course = await courses.getById(req.body.id);
    await cart.add(course);
    res.redirect('/cart')
});

module.exports = router;
