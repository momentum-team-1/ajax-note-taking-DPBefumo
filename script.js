const noteForm = document.querySelector('#note-form')
const noteList = document.querySelector('#notes')

noteForm.addEventListener('submit', function(event){
    event.preventDefault()
    // const titleTextInput = document.querySelector('#title-text')
    // const titleText = titleTextInput.value
    // titleTextInput.value = ''
    // createNewNote(titleText)
    const noteTextInput = document.querySelector('#note-text')
    const noteText = noteTextInput.value
    noteTextInput.value = ''
    createNewNote(noteText)//titleText
})

function createNewNote(noteText) { //titleText
    fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({item: noteText, created: moment().format()}) //title: titleText,
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
            const list = document.createElement('div')
            list.id = 'note-list'
            for (let note of notes) {
                // let titleItem = document.createElement('h5')
                // titleItem.classList.add('mar-xs')
                // titleItem.dataset.id = title.id
                // titleItem.innerText = title.item
                let listItem = document.createElement('p')
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
                // list.appendChild(titleItem)
                list.appendChild(listItem)
            }
        noteList.appendChild(list)
    })
}

noteList.addEventListener('click', function (event) {
    let targetEl = event.target
    let noteItem = document.querySelector('#note-text')
    if (targetEl.matches('#edit')) {
        editNoteItem(noteItem.dataset.id, targetEl.parentElement.dataset.id)
    } else if (targetEl.matches('#delete')){
        deleteNoteItem(targetEl.parentElement.dataset.id)
    }
})

function editNoteItem (noteItem, itemId) {
    let editNote = document.querySelector(`p[data-id='${itemId}']`)
    fetch(`http://localhost:3000/notes/${itemId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({item: noteItem})
    })
}

function deleteNoteItem (itemId) {
    let deleteNote = document.querySelector(`p[data-id='${itemId}']`)
    fetch(`http://localhost:3000/notes/${itemId}`, {
        method: 'DELETE'
    })
    .then(function() {
        document.querySelector('#note-list').removeChild(deleteNote)
    })
}
