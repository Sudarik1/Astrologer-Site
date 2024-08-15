
// set up

// database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



// grabbing elements

// database
const databaseSettings = {
    databaseURL: "https://astrologer-site-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const dataApp = initializeApp(databaseSettings)
const database = getDatabase(dataApp)

const notesDatabase = ref(database, "notes")

// notes
const notesList = document.getElementById("notes-list");
const fullNoteContainer = document.getElementById("full-note-container");
const backToAllNotesBtn = document.getElementById('back-to-all-notes-btn')



// event listeners

function addEventListenerToNotes() {
    const noteTitles = document.querySelectorAll('.note-title');
    noteTitles.forEach(title => {
        title.addEventListener('click', function() {
            const noteDiv = title.closest('.rendered-note');
            const key = noteDiv.getAttribute('data-key');
            displayFullNoteByKey(key);
        });
    });
}

backToAllNotesBtn.addEventListener('click', showAllNotes)



//render to DOM
restoreNotePage()

function restoreNotePage(){
    fetchAndDisplayHeaders()
    hideFullNote()
    backToAllNotesBtn.classList.add('hidden')
}

function fetchAndDisplayHeaders() {
    onValue(notesDatabase, function(snapshot) {
        const notesObject = snapshot.val();
        let feedHtml = '';

        for (const key in notesObject) {
            const header = notesObject[key].header;
            feedHtml += `
                <div class='rendered-note note-link-style' data-key="${key}">
                    <h2 class="note-title notes-font-weight">${header}</h2>
                </div>
            `;
        }

        notesList.innerHTML = feedHtml;
        addEventListenerToNotes();
    });
}

function displayFullNoteByKey(key) {
    onValue(notesDatabase, function(snapshot) {
        const notesObject = snapshot.val();
        const note = notesObject[key];

        if (note) {
            let feedHtml = `
                <div id='full-note-container'>
                    <h2 class='note-title'>${note.header}</h2>
                    <p>${note.text.replace(/\n/g, '<br>')}</p>
            `;
            
            if (note.audio) {
                feedHtml += `
                    <audio controls>
                        <source src="${note.audio}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                `;
            }

            feedHtml += `</div>`;
            
            fullNoteContainer.innerHTML = feedHtml;
            backToAllNotesBtn.classList.remove('hidden');
            hideNotes();
        }
    });
}

function hideNotes() {
    const renderedNotes = document.querySelectorAll('.rendered-note');
    renderedNotes.forEach(note => note.classList.add('hidden'));
}

function hideFullNote() {
    fullNoteContainer.innerHTML = '';
    backToAllNotesBtn.classList.add('hidden');
}

function showAllNotes(){
    const renderedNotes = document.querySelectorAll('.rendered-note');
    renderedNotes.forEach( (note) => note.classList.remove('hidden'))
    backToAllNotesBtn.classList.toggle('hidden')
    hideFullNote()
}