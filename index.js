
import { notes } from "./data.js";


// grab application form 
const applicationForm = document.getElementById('application-form')
console.log(applicationForm)

// grab "pages" content 
const toggleContentDisplayBtnArray = document.querySelectorAll('.nav-btn');

// grab dimploms photos
const dimplomPhotoArray = document.querySelectorAll('.diplom-photo')

// grab of notes
const notesList = document.getElementById("notes-list");
const fullNoteContainer = document.getElementById("full-note-container");
const backToAllNotesBtn = document.getElementById('back-to-all-notes-btn')


// display "pages" content 

// add click event listener to each toggle button
toggleContentDisplayBtnArray.forEach(button => {
    button.addEventListener('click', toggleContentDisplay);
});

function toggleContentDisplay(e) {
    // Get the target section ID from the button's data attribute
    const targetSectionId = e.target.getAttribute('data-target');
    
    const targetSection = document.getElementById(targetSectionId);

    // Hide all other divs
    document.querySelectorAll('.toggle-display-none').forEach(div => {
        div.style.display = 'none';
    });

    // Show the target section
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

// expand dimploms photos

dimplomPhotoArray.forEach(photo =>{
    photo.addEventListener('click', ()=> {
        if (photo.classList.contains('expanded')){
            photo.classList.remove('expanded')
        }
        else {
            dimplomPhotoArray.forEach(photo => photo.classList.remove('expanded'))
            photo.classList.add('expanded')
        }
        
    })
})
// display notes

function getFeedNotesListHtml(){
    let feedHtml = ''
    for (let i = 0; i < notes.length; i++) {
        feedHtml += `
        <div class='rendered-note note-link-style'>
            <h2 class="note-title notes-font-weight">${notes[i].title}</h2>
        </div>
        `
    }
    return feedHtml
}

function displayNotes() {
    notesList.innerHTML = getFeedNotesListHtml()
    addEventListenerToNotes();
}

function addEventListenerToNotes(){
    const noteTitles = document.querySelectorAll('.note-title');
    noteTitles.forEach(title => {
        title.addEventListener('click', function() {
            const index = Array.from(noteTitles).indexOf(title);
            displayFullNote(notes[index]);
        });
    });
}

displayNotes();

// display full note content

function getFeedFullNoteHtml(note){
    let feedHtml = `
        <div id='full-note-container'>
            <h2 class='note-title'>${note.title}</h2>
            <p>${note.paragraph}</p>
        </div>
        `
    return feedHtml
}

function displayFullNote(note) {
    fullNoteContainer.innerHTML = getFeedFullNoteHtml(note);
    backToAllNotesBtn.classList.toggle('hidden')
    hideNotes()
}

function hideNotes(){
    const renderedNotes = document.querySelectorAll('.rendered-note');
    renderedNotes.forEach( (note) => note.classList.add('hidden')) 
}

// return to all notes

backToAllNotesBtn.addEventListener('click', showAllNotes)

function showAllNotes(){
    const renderedNotes = document.querySelectorAll('.rendered-note');
    renderedNotes.forEach( (note) => note.classList.remove('hidden'))
    backToAllNotesBtn.classList.toggle('hidden')
    hideFullNote()
}

function hideFullNote(){
    const fullNote = document.getElementById('full-note-container')
    fullNote.classList.add('hidden')
}

