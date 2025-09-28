const prevEl = document.getElementById('prev')
const currEl = document.getElementById('current')
const keys = document.getElementById('keys')
let prev = ''
let current = '0'
let operator = null
let resetNext = false

function updateScreen() {
  prevEl.textContent = prev || '\u00A0'
  currEl.textContent = current
}

function inputNumber(n) {
  if (resetNext) {
    current = n
    resetNext = false
    return
  }
  if (current === '0' && n !== '.') current = n
  else if (n === '.' && current.includes('.')) return
  else current += n
}

function chooseOperator(op) {
  if (operator && !resetNext) compute()
  operator = op
  prev = `${current} ${op}`
  resetNext = true
}

function compute() {
  if (!operator) return
  const a = parseFloat(prev)
  const b = parseFloat(current)
  if (isNaN(a) || isNaN(b)) return
  let result = 0
  switch (operator) {
    case '+': result = a + b; break
    case '-': result = a - b; break
    case '*': result = a * b; break
    case '/': result = b === 0 ? 'NaN' : a / b; break
  }
  current = String(Number.isFinite(result) ? parseFloat(result.toPrecision(12)).toString() : result)
  operator = null
  prev = ''
}

function clearAll() {
  prev = ''
  current = '0'
  operator = null
  resetNext = false
}

function negate() {
  if (current === '0') return
  current = String(parseFloat(current) * -1)
}

function percent() {
  current = String(parseFloat(current) / 100)
}

keys.addEventListener('click', e => {
  const btn = e.target.closest('.btn')
  if (!btn) return
  const val = btn.dataset.value
  const action = btn.dataset.action
  if (val) inputNumber(val)
  else if (action === 'clear') clearAll()
  else if (action === 'neg') negate()
  else if (action === 'percent') percent()
  else if (action === '=') { compute(); resetNext = true }
  else if (['+','-','*','/'].includes(action)) chooseOperator(action)
  updateScreen()
})

updateScreen()
