const addBtn = document.getElementById("add-btn")
const notesContainer = document.querySelector(".notes-container")
const notes = JSON.parse(localStorage.getItem("notes"))

if (notes) {
    notes.forEach(note => {
        addNewNote(note)
    })
}

function addNewNote(text = '') {
    const note = document.createElement("div")
    
    note.innerHTML = `
        <div class="note">
            <div class="tools d-flex justify-content-between">
                <button class="update-btn"><i class="fa fa-edit"></i></button>
                <button class="delete-btn"><i class="fa fa-trash"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="text ${text ? "hidden" : ""}"></textarea>
        </div>
    `

    const updateBtn = note.querySelector(".update-btn")
    const deleteBtn = note.querySelector(".delete-btn")
    const mainEl = note.querySelector(".main")
    const textArea = note.querySelector("textarea")

    textArea.value = text
    mainEl.innerHTML = marked(text)

    updateBtn.addEventListener("click", () => {
        mainEl.classList.toggle("hidden")
        textArea.classList.toggle("hidden")
    })

    deleteBtn.addEventListener("click", () => {
        note.remove()
    })

    textArea.addEventListener("input", e => {
        const {value} = e.target
        mainEl.innerHTML = marked(value) 
        updateLS()
    })

    notesContainer.appendChild(note)
}

addBtn.addEventListener("click", () => {
    addNewNote()
})

function updateLS() {
    const textAreaEls = document.querySelectorAll("textarea")
    const notes = []
    textAreaEls.forEach(note => {
        console.log(note.value)
        notes.push(note.value)
    })
    localStorage.setItem("notes", JSON.stringify(notes))
}