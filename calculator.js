const btns = document.querySelectorAll("#button");
const userOutput = document.querySelector(".user-output");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const equalBtn = document.getElementById("equal");

let firstNumber = "";
let secondNumber = "";
let operator = "";

let btnNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let operators = ["+", "-", "*", "/"];

userOutput.innerHTML = 0;

// add, subtract, multiply, divide functions
const add = (a, b) => {
  return parseFloat(a) + parseFloat(b);
};
const subtract = (a, b) => {
  return parseFloat(a) - parseFloat(b);
};
const multiply = (a, b) => {
  return parseFloat(a) * parseFloat(b);
};
const divide = (a, b) => {
  return parseFloat(a) / parseFloat(b);
};

// Clicked btns
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    userOutput.innerHTML = "";

    const key = e.target.innerHTML;

    // Check clicked numbers in a range of (0, 9)
    if (btnNumbers.includes(key)) {
      if (operator === "") {
        firstNumber += key;
        userOutput.innerHTML = firstNumber;
      } else {
        secondNumber += key;
        userOutput.innerHTML = secondNumber;
      }
    }
    // Check clicked operators (+, -, *, /)
    if (operators.includes(key)) {
      if (firstNumber !== "") {
        operator = key;
        userOutput.innerHTML = operator;
      }
    }
  });
});

// Equal
equalBtn.addEventListener("click", equalNumbers);
function equalNumbers() {
  if (operator === "/" && secondNumber === "0") {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    setTimeout(() => {
      userOutput.innerHTML = "";
    }, 1000);
    return (userOutput.innerHTML = "Can't divide by zero");
  }
  if (secondNumber !== "") {
    if (operator === "+") {
      firstNumber = add(firstNumber, secondNumber);
    } else if (operator === "-") {
      firstNumber = subtract(firstNumber, secondNumber);
    } else if (operator === "*") {
      firstNumber = multiply(firstNumber, secondNumber);
    } else if (operator === "/") {
      firstNumber = divide(firstNumber, secondNumber);
    }

    secondNumber = "";

    userOutput.innerHTML = firstNumber;
  }
}

// Clear everything
clearBtn.addEventListener("click", clearEverything);
function clearEverything() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  userOutput.innerHTML = 0;
}

// Delete by 1 number
const deleteInput = () => {
  if (secondNumber !== "") {
    return;
  }
  let slicedInput = userOutput.innerHTML.slice(0, -1);
  firstNumber = slicedInput;
  userOutput.innerHTML = slicedInput;
};
deleteBtn.addEventListener("click", deleteInput);

// Type with keys of your keyboard
window.addEventListener("keydown", (e) => {
  const key = e.key;
  console.log(key);
  userOutput.innerHTML = "";

  if (
    key === "0" ||
    key === "1" ||
    key === "2" ||
    key === "3" ||
    key === "4" ||
    key === "5" ||
    key === "6" ||
    key === "7" ||
    key === "8" ||
    key === "9"
  ) {
    if (operator === "") {
      firstNumber += key;
      userOutput.innerHTML = firstNumber;
    } else {
      secondNumber += key;
      userOutput.innerHTML = secondNumber;
    }
  }

  if (key === "Backspace" || key === "Delete") {
    clearEverything();
  } else if (key === "=") {
    equalNumbers();
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    if (firstNumber !== "") {
      operator = key;
      userOutput.innerHTML = operator;
    }
  }
});
