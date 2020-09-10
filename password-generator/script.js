const passEl = document.getElementById("password")
const lengthEl = document.getElementById("length")
const uppercase = document.getElementById("uppercase")
const lowercase = document.getElementById("lowercase")
const number = document.getElementById("number")
const character = document.getElementById("character")
const submitBtn = document.getElementById("submit")
const clipboardBtn = document.getElementById("clipboard")

let obj = {}
let uppercaseArr = []
for (let i = 65; i <= 90; i++) uppercaseArr.push(i)

let lowercaseArr = []
for (let i = 97; i <= 122; i++) lowercaseArr.push(i)

let numberArr = []
for (let i = 48; i <= 57; i++) numberArr.push(i)

let characterArr = []
for (let i = 32; i <= 47; i++) characterArr.push(i)
for (let i = 58; i <= 64; i++) characterArr.push(i)
for (let i = 91; i <= 96; i++) characterArr.push(i)
for (let i = 123; i <= 126; i++) characterArr.push(i)

submitBtn.addEventListener("click", () => {
    obj = {}

    if (uppercase.checked) {
        obj.uppercase = uppercaseArr
    } 
    if (lowercase.checked) {
        obj.lowercase = lowercaseArr
    }
    if (number.checked) {
        obj.number = numberArr
    }
    if (character.checked) {
        obj.character = characterArr
    }

    if (Object.getOwnPropertyNames(obj).length) {
        passEl.innerText = shuffle(generatePassword())
    }
})


clipboardBtn.addEventListener("click", () => {
    const textarea = document.createElement("textarea")
    const pw = passEl.innerText
    if (!pw) return

    textarea.value = pw
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    textarea.remove()
    alert("Password copied to clipboard")
})

function generatePassword() {
    let length = lengthEl.value
    propArr = Object.getOwnPropertyNames(obj)
    let count = propArr.length 
    let chunk = Math.floor(length / count)

    let pass = ""
    for (let i = 0; i < count; i++) {
        if (i === count - 1) {
            pass += getRandomChars(obj[propArr[i]], length)
        } else {
            pass += getRandomChars(obj[propArr[i]], chunk)
            length -= chunk
        }
    }
    return pass
}

function getRandomChars(arr, n) {
    let temp = ""
    let len = arr.length
    for (let i = 0; i < n; i++) {
        temp += String.fromCharCode(arr[Math.floor(Math.random() * len)])
    }
    return temp
}

function shuffle(s) {
    let n = s.length
    let r = []
    let temp = undefined
    while (r.length != n) {
        temp = Math.floor(Math.random() * n)
        if (!(r.includes(temp))) {
            r.push(temp)
        }
    }

    temp = ""
    for (let i = 0; i < n; i++) {
        temp += s[r[i]]
    }

    return temp
}