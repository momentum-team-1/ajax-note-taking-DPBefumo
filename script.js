const noteForm = document.querySelector('#note-form')

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
}
//3. render the list using the data that is now on the server
//function doSomething(){
//fetch('link', {
    //method: 'GET'
// })
// .then(response => response.json())
// .then(function (data) {
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
// })
//}

//doSomething()