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
//3. render the list using the data that is now on the server
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
                listItem.dataset.id = note.id
                listItem.innerText = note.item
                let editIcon = document.createElement('span')
                editIcon.id = 'edit'
                editIcon.classList.add ('fas', 'fa-pen-square')
                listItem.appendChild(editIcon)
                let deleteIcon = document.createElement('span')
                deleteIcon.id = 'delete'
                deleteIcon.classList.add('fas', 'fa-trash')
                listItem.appendChild(deleteIcon)
                list.appendChild(listItem)
            }
        noteList.appendChild(list)
    })
}
    //add the content to the DOM
    //how do i want to add it?
    //let item = document.createElement('whatever')
    //for (let da of data) {
        // let listItem = document.createElement('whatever')
        //give it an id
        //add innerText
        //appendChild
    // }
    //identify a variable to querySelector to where i want this stuff to go
    //appendchild to that variable 

//doSomething()