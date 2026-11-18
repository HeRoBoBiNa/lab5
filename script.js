"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("order-form");
    const product = document.getElementById("product");
    const quantity = document.getElementById("quantity");
    const error = document.getElementById("quantity-error");
    const result = document.getElementById("order-result");
    const positiveInteger = /^[1-9][0-9]*$/;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const input = quantity.value.trim();
        result.hidden = true;
        error.hidden = true;
        quantity.removeAttribute("aria-invalid");

        if (!positiveInteger.test(input) || !Number.isSafeInteger(Number(input))) {
            error.textContent = "Введите целое положительное количество без букв и других символов.";
            error.hidden = false;
            quantity.setAttribute("aria-invalid", "true");
            return;
        }

        const count = parseInt(input, 10);
        const price = parseInt(product.value, 10);
        const total = count * price;

        if (!Number.isSafeInteger(total)) {
            error.textContent = "Слишком большое количество товара.";
            error.hidden = false;
            quantity.setAttribute("aria-invalid", "true");
            return;
        }

        result.textContent = "Стоимость заказа: " + total.toLocaleString("ru-RU") + " ₽";
        result.hidden = false;
    });

    quantity.addEventListener("input", function () {
        error.hidden = true;
        result.hidden = true;
        quantity.removeAttribute("aria-invalid");
    });

    product.addEventListener("change", function () {
        result.hidden = true;
    });
});
