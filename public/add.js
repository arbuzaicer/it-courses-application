const convertCurrency = (price) => {
    return new Intl.NumberFormat('ru-Ru', {
        currency: 'rub',
        style: 'currency'
    }).format(price)
};

document.querySelectorAll('.price').forEach(node => {
    node.textContent = convertCurrency(node.textContent);
});

const $cart = document.getElementById('cart');

if ($cart) {
    $cart.addEventListener('click', e => {
        if (e.target.classList.contains('js-remove')) {
            const id = e.target.dataset.id;
            fetch(`/cart/delete/${id}`, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(cart => {
                    if(cart.courses.length) {
                        const html = cart.courses.map(item => {
                            return `
                            <tr>
                                <td>${item.title}</td>
                                <td>${item.count}</td>
                                <td><button class="btn btn-small js-remove" data-id=${item.id}>Remove</button></td>
                           </tr>
                        `
                        }).join('');
                        document.querySelector('tbody').innerHTML = html;
                    } else {
                        $cart.innerHTML = `<p>Shopping cart is empty</p>`;
                        document.querySelector('.price').textContent = convertCurrency(cart.price);
                    }
                })
        }
    })
}