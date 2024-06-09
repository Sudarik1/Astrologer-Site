
// set up

// database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


// grabbing of elements

// database
const databaseSettings = {
    databaseURL: "https://astrologer-site-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const dataApp = initializeApp(databaseSettings)
const database = getDatabase(dataApp)

const notesDatabase = ref(database, "notes")
const usersCommentsDatabase = ref(database, 'comments')

// application form 
const applicationForm = document.getElementById("application-form");

// pages content 
const toggleContentDisplayBtnArray = document.querySelectorAll('.nav-btn');

// notes
const notesList = document.getElementById("notes-list");
const fullNoteContainer = document.getElementById("full-note-container");
const backToAllNotesBtn = document.getElementById('back-to-all-notes-btn')

// astrologer's dimploms photos
const dimplomPhotoArray = document.querySelectorAll('.diplom-photo')

// guest room users comments
const guestRoomCommentForm = document.getElementById("guest-room-comment-form");
const commentsContainer = document.getElementById("comments-container")

// event listeners

//form submission
applicationForm.addEventListener("submit", function(event) {

    const validationErrors = checkApplicationFormValidation();
    event.preventDefault();
    
    if (validationErrors.length > 0){
        alert(validationErrors.join('\n'));
    } else {
        alert("Ваша заявка отправлена!");
    }

    applicationForm.reset();

});

// pages content 
toggleContentDisplayBtnArray.forEach(button => {
    button.addEventListener('click', toggleContentDisplay);
});

// notes
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

//diploms photos

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

//comments
guestRoomCommentForm.addEventListener("submit", function(event) {

    const validationErrors = checkGuestRoomUserCommentValidation();

    const userNameValue = document.getElementById("guest-room-user-name").value.trim();
    const userCommentValue = document.getElementById("guest-room-user-comment").value.trim();

    event.preventDefault();
    if (validationErrors.length > 0){
        alert(validationErrors.join('\n'));
    } else {
        const newCommentRef = push(usersCommentsDatabase);
        set(newCommentRef, {
            name: userNameValue,
            comment: userCommentValue
        });
    alert("Благодарю за отзыв. Ваш комментарий успешно отправлен!");
    guestRoomCommentForm.reset();
    } 
    
});

//render to DOM

//pages content
function toggleContentDisplay(e) {
    restoreNotePage()
    fetchAndDisplayComments()

    const targetSectionId = e.target.getAttribute('data-target');
    
    const targetSection = document.getElementById(targetSectionId);

    document.querySelectorAll('.toggle-display-none').forEach(div => {
        div.style.display = 'none';
    });

    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

// notes
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
                    <p>${note.text}</p>
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

//users comments
function fetchAndDisplayComments() {
    onValue(usersCommentsDatabase, function(snapshot) {
        const commentsObject = snapshot.val();
        let feedHtml = '';

        for (const key in commentsObject) {
            const userName = commentsObject[key].name;
            const comment = commentsObject[key].comment;
            feedHtml += `
                <div class='guest-room-rendered-comment comment-link-style' data-key="${key}">
                    <h3 class="guest-room-comment-user-name">${userName}</h3>
                    <p class="guest-room-comment-user-text">${comment}</p>
                </div>
            `;
        }

        commentsContainer.innerHTML = feedHtml;
    });
}


// validation
function checkApplicationFormValidation() {
   
    const userName = document.getElementById('user-name').value;
    const userEmail = document.getElementById('user-email').value;
    const userPhone = document.getElementById('user-phone').value;

    const nameValidationPattern = /^[a-zA-Zа-яА-ЯёЁ]+(([',. -][a-zA-Zа-яА-ЯёЁ ])?[a-zA-Zа-яА-ЯёЁ]*)*$/;
    const emailValidationPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneValidationPattern = /^\+?[0-9\s\-]{7,15}$/;

    let errorsArray = [];

    if (userName && !nameValidationPattern.test(userName)) {
        errorsArray.push('Пожалуйста, проверьте корректность указания имени.');
    }
    if (userEmail && !emailValidationPattern.test(userEmail)) {
        errorsArray.push('Пожалуйста, проверьте корректность указания электронной почты.');
    }
    if (userPhone && !phoneValidationPattern.test(userPhone)) {
        errorsArray.push('Пожалуйста, проверьте корректность указания номера телефона.');
    }
    if (!userEmail && !userPhone) {
        errorsArray.push('Пожалуйста, укажите номер телефона или адрес электронной почты');
    }

    return errorsArray;
}

function checkGuestRoomUserCommentValidation(){
    
    const userName = document.getElementById("guest-room-user-name").value.trim();
    const userComment = document.getElementById("guest-room-user-comment").value.trim();

    const commentValidationPattern = /^[a-zA-Z0-9\s.,?!'"\-]{1,500}$/;
    const nameValidationPattern = /^[a-zA-Zа-яА-ЯёЁ]+(([',. -][a-zA-Zа-яА-ЯёЁ ])?[a-zA-Zа-яА-ЯёЁ]*)*$/;

    let errorsArray = [];

    if (!userName && !userComment){
        errorsArray.push("Пожалуйста, укажите Ваше имя и оставьте комментарий.")
    }
    else if (!userComment){
        errorsArray.push("Пожалуйста, оставьте Ваш комментарий.")
    }
    else if (!userName) {
        errorsArray.push("Пожалуйста, укажите Ваше имя.");
    }
    else if (userName && !nameValidationPattern.test(userName)) {
        errorsArray.push('Пожалуйста, проверьте корректность указания имени.');
    }
    else if (userComment && !commentValidationPattern.test(userComment)){
        errorsArray.push("Ваш комментарий слишком длинный или содержит неприемлимые символы.")
    }

    return errorsArray;
}