const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const path = require('path');

class Course {

    constructor(title, price, image) {
        this.title = title;
        this.price = price;
        this.image = image;
        this.id = uuidv4();
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            image: this.image,
            id: this.id
        }
    }

    async save() {
        const courses = await Course.getAll();
        courses.push(this.toJSON());
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve();
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }
                })
        })
    }

    static async getById(id) {
        const courses = await Course.getAll();
        return courses.find(course => course.id === id);
    }

    static async update({title, price, image, id}) {
        const courses = await Course.getAll();
        const editedCourse = {title, price, image, id};
        const idx = courses.findIndex(course => course.id === id);

        courses[idx] = editedCourse;

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve();
                    }
                }
            )
        })
    }
}

module.exports = Course;
