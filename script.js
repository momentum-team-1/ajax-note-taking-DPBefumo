const noteForm = document.querySelector('#note-form')

//1. add event listener for form submission to listen to submit event
noteForm.addEventListener('submit', function(event){
    event.preventDefault()
    const noteTextInput = document.querySelector('#note-text')
    const noteText = noteTextInput.value
    noteTextInput.value = ''
    createNewNote(noteText)
})
//console.log to check
//may need preventDefult() because of autorefresh 
//have a way to input text in form
//add in function to grab text --> createNewItem(name of argument)

//2. write the fetch request to post data, in its own function
//function createNewItem(same sas argument on line 8)
//fetch('http://localhost:3000/notes', {
    // method: 'POST',
    // headers: {}
    //body: JSON.stringify {}
// })
//.then(response => response.json())
//.then(data => consol.log(data))

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