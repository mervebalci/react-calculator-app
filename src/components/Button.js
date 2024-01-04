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
  return (
    <button className={`${getStyleName(value)} button`}>
      {value}
    </button>
  )
}