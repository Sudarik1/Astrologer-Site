
// set up

// database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



// grabbing elements

// database
const databaseSettings = {
    databaseURL: "https://astrologer-site-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const dataApp = initializeApp(databaseSettings)
const database = getDatabase(dataApp)

const usersCommentsDatabase = ref(database, 'comments')

// guest room users comments
const guestRoomCommentForm = document.getElementById("guest-room-comment-form");
const commentsContainer = document.getElementById("comments-container")



// event listeners

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
fetchAndDisplayComments()

function fetchAndDisplayComments() {
    onValue(usersCommentsDatabase, function(snapshot) {
        const commentsObject = snapshot.val();
        let feedHtml = '';

        for (const key in commentsObject) {
            const userName = commentsObject[key].name;
            const comment = commentsObject[key].comment;
            
            if (comment) {
                feedHtml += 
                    `
                        <div class='guest-room-rendered-comment comment-link-style' data-key="${key}">
                            <h3 class="guest-room-comment-user-name">${userName}</h3>
                            <p class="guest-room-comment-user-text">${comment.replace(/\n/g, '<br>')}</p>
                        </div>
                    `;
                }
            }
        commentsContainer.innerHTML = feedHtml;
    });
}



// validation

function checkGuestRoomUserCommentValidation(){
    
    const userName = document.getElementById("guest-room-user-name").value.trim();
    const userComment = document.getElementById("guest-room-user-comment").value.trim();

    const commentValidationPattern = /^[a-zA-Zа-яА-ЯёЁ0-9\s.,?!'"():;\-]{1,1000}$/;
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