let calculator;
let outputArea;
let equal;
let reset;
let backspace;
let lastInput = [];
let expression = "";
let inputArray = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "+",
  "-",
  "*",
  "/",
  ".",
];

// Waits for DOM to load before listner starts its job
document.addEventListener("DOMContentLoaded", () => {
  calculator = document.querySelector(".calculator");
  outputArea = document.querySelector("div.output>p");
  equal = document.getElementById("equal");
  reset = document.getElementById("reset");
  backspace = document.getElementById("backspace");

  calculator.addEventListener("click", (e) => {
    let clickInput = e.target.innerText;
    expression += getInputExpression(clickInput);
    outputArea.innerText = expression;
  });

  window.addEventListener("keyup", (e) => {
    console.log(e);
    switch (true) {
      case inputArray.includes(e.key):
        expression += getInputExpression(e.key);
        outputArea.textContent = expression;
        break;
      case e.key === "Backspace":
        clearLastDigit(expression);
        break;
      case e.key === "Enter":
        getOutputResult(expression);
        break;
    }
  });

  // It does the final calculation and gives us the result
  equal.addEventListener("click", (e) => {
    e.stopPropagation();
    getOutputResult(expression);
  });

  // It will remove last character from our display
  backspace.addEventListener("click", (e) => {
    e.stopPropagation();
    clearLastDigit(expression);
  });

  // It will reset all the given input
  reset.addEventListener("click", (e) => {
    e.stopPropagation();
    outputArea.textContent = "";
    expression = "";
  });
});

/** Function is used only when mouse click event occurs */
function getInputExpression(input) {
  if (inputArray.includes(input)) {
    return input;
  }
}

function getOutputResult(input) {
  if (input) {
    result = getCalculationResult(input);
    outputArea.textContent = result;
    expression = `${result}`;
  } else {
    outputArea.textContent =
      "No Input Provided.";
  }
}


/** Calulates the combination of input we have received
 * i.e. "number operator number" */
function getCalculationResult(expression) {
  switch (true) {
    case expression.includes("+"):
      return calculation(
        expression.split("+").map((num) => Number(num)),
        "+"
      );
    case expression.includes("-"):
      return calculation(
        expression.split("-").map((num) => Number(num)),
        "-"
      );
    case expression.includes("*"):
      return calculation(
        expression.split("*").map((num) => Number(num)),
        "*"
      );
    case expression.includes("/"):
      return calculation(
        expression.split("/").map((num) => Number(num)),
        "/"
      );
    case Number(expression) !== NaN:
      return calculation([Number(expression), lastInput[1]], lastInput[2]);
  }
}

/** This function performs all the mathematical calculations requried */
function calculation(array, operator) {
  lastInput = [array[0], array[1], operator];
  return array.reduce((num1, num2) => {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        if (num2 === 0) {
          window.alert("I am watching you!");
          return "";
        } else {
          return num1 / num2;
        }
    }
  });
}

/** This function will remove the last digit from our output */
function clearLastDigit(input) {
  expression = input.substring(0, input.length - 1);
  outputArea.innerText = expression;
}