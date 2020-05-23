const path = require('path');
const fs = require('fs');

class Cart {
    static async add(course) {
        const cart = await Cart.getData();
        const idx = cart.courses.findIndex(c => c.id === course.id);
        const currentCourse = cart.courses[idx];

        if (currentCourse) {
            currentCourse.count++;
            cart.courses[idx] = currentCourse;
        } else {
            course.count = 1;
            cart.courses.push(course);
        }

        cart.price += Number(course.price);

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'cart.json'),
                JSON.stringify(cart),
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

    static async getData() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'cart.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(content));
                    }
                }
            )
        })
    }

    static async remove(id) {
        const cart = await Cart.getData();
        const idx = cart.courses.findIndex(c => c.id === id);
        const currentCourse = cart.courses[idx];
        if(currentCourse.count === 1) {
            cart.courses = cart.courses.filter(course => course.id!== id);
        } else {
            currentCourse.count--;
            cart.courses[idx] = currentCourse;
        }
        cart.price-=currentCourse.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'cart.json'),
                JSON.stringify(cart),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(cart);
                    }
                }
            )
        })
    }
}

module.exports = Cart;