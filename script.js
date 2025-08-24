document.addEventListener("DOMContentLoaded", () => {
  const calculator = document.querySelector(".calculator");
  const outputArea = document.querySelector("div.output>p");
  const equal = document.getElementById("equal");
  const reset = document.getElementById("reset");
  let expression = "";

  calculator.addEventListener("click", (e) => {
    let clickInput = e.target.innerText;
    switch (clickInput) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
      case "+":
      case "/":
      case "*":
      case "-":
        expression += clickInput;
        break;
      case "+/-":
        negative = false;
        break;
    }
    outputArea.innerText = expression;
  });

  equal.addEventListener("click", (e) => {
    e.stopPropagation();
    result = getCalculationResult(expression);
    outputArea.textContent = result;
    expression = `${result}`;
  });

  reset.addEventListener("click", (e) => {
    e.stopPropagation();
    outputArea.textContent = "";
    expression = "";
  });
});

function getCalculationResult(expression) {
  switch (true) {
    case expression.includes("+"):
      return calculation(expression.split("+").map(num => Number(num)), "+");
    case expression.includes("-"):
      return calculation(expression.split("-").map(num => Number(num)), "-");
    case expression.includes("*"):
      return calculation(expression.split("*").map(num => Number(num)), "*");
    case expression.includes("/"):
      return calculation(expression.split("/").map(num => Number(num)), "/");
  }
}

function calculation(array, operator) {
  return array.reduce((num1, num2) => {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
    }
  });
}
