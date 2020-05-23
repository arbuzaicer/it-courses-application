const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => { //роут /courses - добавлен в файле index.js
    res.status(200);
    const courses = await Course.getAll();
    res.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses
    })
});

router.get('/:id/edit', async (req, res) => {
   if(!req.query.allow) {
       return res.redirect('/courses');
   }
   const course = await Course.getById(req.params.id);
   const { title, price, image, id } = await course;
   res.render('course-edit', {
       title, price, image, id
   })
});

router.post('/edit', async (req, res) => {
    await Course.update(req.body);
    res.redirect('/courses');
});

router.get('/:id', async(req, res) => {
    const course = await Course.getById(req.params.id);
    const { title, image, price } = await course;
    res.render('course', {
        layout: 'empty',
        title: `Course ${title}`,
        price,
        image
    })
});



module.exports = router;
