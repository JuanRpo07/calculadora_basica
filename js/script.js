"use strict";
// Referencio objetos del DOM
const pantalla = document.querySelector(".pantalla");
const contenedorTeclas = document.querySelector(".contenedorTeclas");

let numero1 = "";
let numero2 = "";
let operador = null;
let escribiendoSegundoNumero = false;

contenedorTeclas.addEventListener("click", (e) => {
  const tecla = e.target;

  // Si lo cliqueado no es un botón, salir
  if (!tecla.classList.contains("btnTecla")) return;

  const valor = tecla.textContent;

  // 1. Limpiar (CE)
  if (valor === "CE") {
    numero1 = "";
    numero2 = "";
    operador = null;
    escribiendoSegundoNumero = false;
    pantalla.value = "";
    return;
  }

  // 2. Si es un número
  if (!isNaN(valor)) {
    // '0'..'9'
    if (!escribiendoSegundoNumero) {
      numero1 += valor;
      pantalla.value = numero1;
    } else {
      numero2 += valor;
      pantalla.value = numero2;
    }
    return;
  }

  // 3. Si es un operador
  if (["+", "-", "X", "/"].includes(valor)) {
    if (numero1 === "") return; // si aún no hay número1, no hacemos nada
    operador = valor;
    escribiendoSegundoNumero = true;
    return;
  }

  // 4. Si es '='
  if (valor === "=") {
    if (numero1 === "" || numero2 === "" || !operador) return;

    const n1 = parseFloat(numero1);
    const n2 = parseFloat(numero2);
    let resultado;

    switch (operador) {
      case "+":
        resultado = n1 + n2;
        break;
      case "-":
        resultado = n1 - n2;
        break;
      case "X":
        resultado = n1 * n2;
        break;
      case "/":
        resultado = n2 === 0 ? "Error" : n1 / n2;
        break;
    }

    pantalla.value = resultado;
    // Preparar para una nueva operación
    numero1 = String(resultado);
    numero2 = "";
    operador = null;
    escribiendoSegundoNumero = false;
  }
});
