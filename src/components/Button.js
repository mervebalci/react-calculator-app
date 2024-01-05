import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

function getStyleName(btn) {
  const className = {
    "C": "clear",
    "=": "equals",
    "+": "opt",
    "-": "opt",
    "x": "opt",
    "÷": "opt",
  }
  return className[btn]
}

export default function Button({ value }) {
  const { calc, setCalc } = useContext(CalcContext);

  function handleBtnClick() {
    const buttons = {
      ".": decimalClick,
      "C": clearClick,
      "+": optClick,
      "-": optClick,
      "x": optClick,
      "÷": optClick,
      "=": equalsClick,
      "%": percentClick,
    }
    if (buttons[value]) {
      return buttons[value]()
    } else {
      return handleNumberClick()
    }
  }


  // When user clicks on any number 0-9 button
  function handleNumberClick() {
    // First, change the number value to string
    const numberToString = value.toString()

    // Then, add multiple digit numbers
    let numberValue;
    if (calc.number === 0 && numberToString === "0") {
      numberValue = "0"
    } else {
      numberValue = Number(calc.number + value)
    }
    setCalc({...calc, number: numberValue})
  }


  // When user clicks on decimal point "." button
  function decimalClick() {
    setCalc({...calc, number: !calc.number.toString().includes('.') ? calc.number + value : calc.number})
  }


  // When user clicks on clear "C" button
  function clearClick() {
    setCalc({
      opt: "",
      number: 0,
      result: 0
    })
  }


  // When user clicks on any operation "+ - x ÷" button
  function optClick() {
    setCalc({
      opt: value,
      number: 0,
      result: !calc.result && calc.number ? calc.number : calc.result
    })
  }


  // When user clicks on equals "=" button
  function equalsClick() {
    if (calc.result && calc.number) {
      function math(a, b, opt) {
        const result = {
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
          "x": (a, b) => a * b,
          "÷": (a, b) => a / b,
        }
        return result[opt](a, b);
      }
      setCalc({
        sign: "",
        number: 0,
        result: math(calc.result, calc.number, calc.opt)
      })
    }
  }


  // When user clicks on percent "%" button
  function percentClick() {
    setCalc({
      opt: "",
      number: calc.number / 100,
      result: calc.result / 100
    })
  }


  return (
    <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>
      {value}
    </button>
  )
}