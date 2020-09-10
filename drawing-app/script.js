const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const increaseBtn = document.getElementById("increase")
const decreaseBtn = document.getElementById("decrease")
const sizeEl = document.getElementById("size")
const colorEl = document.getElementById("color")
const clearEl = document.getElementById("clear")

let isPressed = false
let size = 30
let color = "black"
let x = undefined
let y = undefined

canvas.addEventListener("mousedown", (e) => {
    isPressed = true
    x = e.offsetX
    y = e.offsetY
})

canvas.addEventListener("mouseup", () => {
    isPressed = false
    x = undefined
    y = undefined
})

canvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
        x2 = e.offsetX
        y2 = e.offsetY
        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)
        x = x2
        y = y2
    }
})

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}

increaseBtn.addEventListener("click", () => {
    size += 5
    if (size > 50) {
        size = 50
    }
    updateSize()
})

decreaseBtn.addEventListener("click", () => {
    size -= 5
    if (size < 5) {
        size = 5
    }
    updateSize()
})

colorEl.addEventListener("change", e => {
    color = e.target.value
})

clearEl.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

function updateSize() {
    sizeEl.innerText = size;
}

function drawCircle(x, y) {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(x, y, size, 0, 2 * Math.PI)
    ctx.fill()
}