const noteForm = document.querySelector('#note-form')
const noteList = document.querySelector('#notes')

noteForm.addEventListener('submit', function(event){
    event.preventDefault()
    const noteTextInput = document.querySelector('#note-text')
    const noteText = noteTextInput.value
    noteTextInput.value = ''
    createNewNote(noteText)
})

function createNewNote(noteText) {
    fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({item: noteText, created: moment().format()})
    })
    .then(response => response.json())
    .then(() => renderNotes())
}

function renderNotes() {
    noteList.innerHTML = ''
    fetch('http://localhost:3000/notes', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(function (notes) {
            const list = document.createElement('ul')
            list.id = 'note-list'
            for (let note of notes) {
                let listItem = document.createElement('li')
                listItem.classList.add('mar-md')
                listItem.dataset.id = note.id
                listItem.innerText = note.item
                let editIcon = document.createElement('button')
                editIcon.id = 'edit'
                editIcon.classList.add ('fa', 'fa-edit', 'mar-l-xs')
                listItem.appendChild(editIcon)
                let deleteIcon = document.createElement('button')
                deleteIcon.id = 'delete'
                deleteIcon.classList.add('fa', 'fa-trash', 'mar-l-xs')
                listItem.appendChild(deleteIcon)
                list.appendChild(listItem)
            }
        noteList.appendChild(list)
    })
}

noteList.addEventListener('click', function (event) {
    let targetEl = event.target
    if (targetEl.matches('#edit')) {
        console.log('edit')
        editNoteItem(targetEl.parentElement.dataset.id)
    } else if (targetEl.matches('#delete')){
        console.log('delete')
        deleteNoteItem(targetEl.parentElement.dataset.id)
    }
})

function deleteNoteItem (itemId) {
    let deleteNote = document.querySelector(`li[data-id='${itemId}']`)
    fetch(`http://localhost:3000/notes/${itemId}`, {
        method: 'DELETE'
    })
    .then(function() {
        document.querySelector('#note-list').removeChild(deleteNote)
    })
}

// Needs to be edited!!!!

// function editNoteItem (itemId) {
//     let editNote = document.querySelector(`li[data-id='${itemId}']`)
//     fetch(`http://localhost:3000/notes/${itemId}`, {
//         method: 'PATCH'
//     })
// }