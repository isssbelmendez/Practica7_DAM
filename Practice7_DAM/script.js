// Variables para almacenar los productos
const products = [
    {
        id: 1,
        name: 'Galleta Oreo',
        stock: 20,
        price: 0.50,
        quantity: 20
    },

    {
        id: 2,
        name: 'Chocolates',
        stock: 25,
        price: 1.00,
        quantity: 25
    },

    {
        id: 3,
        name: 'Gomitas',
        stock: 30,
        price: 1.25,
        quantity:30
    },

    {
        id: 4,
        name: 'Paletas',
        stock: 40,
        price: 0.75,
        quantity: 40
    },

    {
        id: 5,
        name: 'Bombones',
        stock: 48,
        price: 0.25,
        quantity: 48
    },
];

// Formulario de producto
const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const productName = document.getElementById("product-name").value;
    const productPrice = parseFloat(document.getElementById("product-price").value);
    const productQuantity = parseInt(document.getElementById("product-quantity").value);

    if (productName && !isNaN(productPrice) && !isNaN(productQuantity)) {
        // Crear un objeto de producto
        const product = {
            name: productName,
            price: productPrice,
            quantity: productQuantity
        };

        // Agregar el producto al array y limpiar el formulario
        products.push(product);
        productForm.reset();

        // Actualizar la tabla de productos
        updateProductTable();

    } else {
        alert("Por favor, complete todos los campos correctamente.");
    }
});

// Función para actualizar la tabla de productos
function updateProductTable() {
    const productTable = document.getElementById("product-table");
    const tbody = productTable.querySelector("tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        // Crear una fila para el producto
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td><button class="btn btn-danger btn-remove" data-index="${i}">Eliminar</button></td>
        `;

        // Agregar la fila a la tabla
        tbody.appendChild(row);
    }

    // Agregar el evento de eliminación a los botones
    const removeButtons = document.querySelectorAll(".btn-remove");
    removeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            products.splice(index, 1);
            updateProductTable();
        });
    });
}

// Calcular el precio total
const calculateTotalButton = document.getElementById("calculate-total");
calculateTotalButton.addEventListener("click", function () {
    const totalPrice = products.reduce((total, product) => total + (product.price * product.quantity), 0);
    document.getElementById("total-price").innerHTML = `<h3>Precio Total: $${totalPrice.toFixed(2)}</h3>`;
});
