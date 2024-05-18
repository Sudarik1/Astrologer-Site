
import { notes } from "./data.js";

// grab "pages" content 
const toggleContentDisplayBtnArray = document.querySelectorAll('.nav-btn');

// grab of notes
const notesList = document.getElementById("notes-list");

const fullNoteContainer = document.getElementById("fullNoteContainer");

const backToAllNotesBtn = document.getElementById('back-to-all-notes-btn')

 
// display "pages" content 

// add click event listener to each toggle button
toggleContentDisplayBtnArray.forEach(button => {
    button.addEventListener('click', toggleContentDisplay);
});

backToAllNotesBtn.addEventListener('click', showAllNotes)


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


// display notes
const notesPerPage = 20;
let currentPage = 1;
const startIndex = (currentPage - 1) * notesPerPage;
const endIndex = startIndex + notesPerPage;

function getFeedNotesListHtml(){
    let feedHtml = ''
    for (let i = startIndex; i < endIndex && i < notes.length; i++) {
        feedHtml += `
        <div class='rendered-note'>
            <h2 class="note-title ">${notes[i].title}</h2>
        </div>
        `
        // <p class="">${notes[i].description}</P>
    }
    return feedHtml
}

function addEventListenerToNotes(){
    const noteTitles = document.querySelectorAll('.note-title');
    noteTitles.forEach(title => {
        title.addEventListener('click', function() {
            const index = Array.from(noteTitles).indexOf(title) + startIndex;
            displayFullNote(notes[index]);
        });
    });
}

function displayNotes() {
    notesList.innerHTML = getFeedNotesListHtml()
    addEventListenerToNotes();
}

displayNotes();

// display full note content

function getFeedFullNoteHtml(note){
    let feedHtml = `
        <div id='full-note-container'>
            <h2>${note.title}</h2>
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