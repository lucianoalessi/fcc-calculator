import { useState } from 'react';
import './App.css';

function App() {

  // Estados para almacenar el resultado y la expresión de la calculadora
  const [answer, setAnswer] = useState(""); // Almacena el resultado de las operaciones
  const [expression, setExpression] = useState(""); // Almacena la expresión actual ingresada por el usuario
  const et = expression.trim(); // Almacena la expresión sin espacios en blanco al principio o al final

  // Función para verificar si un símbolo es un operador (+, -, *, /)
  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
  };

  // Función que se ejecuta al presionar un botón en la calculadora
  const buttonPress = (symbol) => {
    if (symbol === "clear") {
      // Si se presiona el botón "C", se borra el resultado y la expresión
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      // Si se presiona el botón "+/-", se cambia el signo del resultado actual
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percent") {
      // Si se presiona el botón "%", se convierte el resultado a porcentaje
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      // Si se presiona un operador, se agrega a la expresión actual
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      // Si se presiona el botón "=", se realiza el cálculo de la expresión
      calculate();
    } else if (symbol === "0") {
      // Si se presiona el botón "0", se agrega a la expresión actual solo si no es el primer dígito
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      // Si se presiona el botón ".", se agrega solo si no hay un punto en el último número
      const lastNumber = expression.split(/[-+/*]/g).pop(); // Se obtiene el último número de la expresión
      if (!lastNumber) return;
      // Si el último número ya contiene un punto decimal, no se agrega otro
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      // Para cualquier otro dígito, se agrega a la expresión actual
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  // Función para realizar el cálculo de la expresión ingresada
  const calculate = () => {
    // Si el último carácter es un operador, no se hace nada
    if (isOperator(et.charAt(et.length - 1))) return;
    // Se limpia la expresión para que dos operadores seguidos usen el último operador
    // Por ejemplo, "5 * - + 5" se interpreta como "5 * (-5)"
    const parts = et.split(" ");
    const newParts = [];

    // Se recorren las partes en reversa
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      // Se evalúa la nueva expresión y se actualiza el resultado
      setAnswer(eval(answer + newExpression).toString());
    } else {
      setAnswer(eval(newExpression).toString());
    }
    setExpression("");
  };



  return (
    <div className="App">
      <div className="container">
        <h1>Calculator Application</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button
            id="clear"
            onClick={() => buttonPress("clear")}
            className="light-gray"
          >
            C
          </button>
          <button
            id="negative"
            onClick={() => buttonPress("negative")}
            className="light-gray"
          >
            +/-
          </button>
          <button
            id="percentage"
            onClick={() => buttonPress("percentage")}
            className="light-gray"
          >
            %
          </button>
          <button
            id="divide"
            onClick={() => buttonPress("/")}
            className="yellow"
          >
            /
          </button>
          <button
            id="seven"
            onClick={() => buttonPress("7")}
            className="dark-gray"
          >
            7
          </button>
          <button
            id="eight"
            onClick={() => buttonPress("8")}
            className="dark-gray"
          >
            8
          </button>
          <button
            id="nine"
            onClick={() => buttonPress("9")}
            className="dark-gray"
          >
            9
          </button>
          <button
            id="multiply"
            onClick={() => buttonPress("*")}
            className="yellow"
          >
            *
          </button>
          <button
            id="four"
            onClick={() => buttonPress("4")}
            className="dark-gray"
          >
            4
          </button>
          <button
            id="five"
            onClick={() => buttonPress("5")}
            className="dark-gray"
          >
            5
          </button>
          <button
            id="six"
            onClick={() => buttonPress("6")}
            className="dark-gray"
          >
            6
          </button>
          <button
            id="subtract"
            onClick={() => buttonPress("-")}
            className="yellow"
          >
            -
          </button>
          <button
            id="one"
            onClick={() => buttonPress("1")}
            className="dark-gray"
          >
            1
          </button>
          <button
            id="two"
            onClick={() => buttonPress("2")}
            className="dark-gray"
          >
            2
          </button>
          <button
            id="three"
            onClick={() => buttonPress("3")}
            className="dark-gray"
          >
            3
          </button>
          <button id="add" onClick={() => buttonPress("+")} className="yellow">
            +
          </button>
          <button
            id="zero"
            onClick={() => buttonPress("0")}
            className="dark-gray"
          >
            0
          </button>
          <button
            id="decimal"
            onClick={() => buttonPress(".")}
            className="dark-gray"
          >
            .
          </button>
          <button
            id="equals"
            onClick={() => buttonPress("=")}
            className="yellow"
          >
            =
          </button>
        </div>
      </div>
      <div className='author'>
        Designed and Coded by
        <br/>
        <a href='https://www.linkedin.com/in/lucianoalessi/' target='_blank'>Luciano A. Alessi</a>
      </div>
    </div>
  );
}

export default App;
