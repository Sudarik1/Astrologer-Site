
// grabbing DOM elements
const commentsContainer = document.getElementById("comments-container")

const guestRoomCommentForm = document.getElementById("guest-room-comment-form");



// event listeners
document.addEventListener("DOMContentLoaded", fetchAndDisplayComments);

guestRoomCommentForm.addEventListener("submit", sendComment)



//render to DOM
async function fetchAndDisplayComments() {
    try {
        const response = await fetch('fetchComments')
        const commentsArray = await response.json();

        let feedHtml = '';

        if (commentsArray.message){
            feedHtml += 
                `
                    <h1>${commentsArray.message}<h1>
                `   
        }
        else{
            commentsArray.forEach(comment => {
                const userName = comment.name;
                const userComment = comment.body;
    
                if (userComment) {
                    feedHtml += 
                        `
                            <div class='guest-room-rendered-comment comment-link-style' data-id="${comment._id}">
                                <h3 class="guest-room-comment-user-name">${userName}</h3>
                                <p class="guest-room-comment-user-text">${userComment.replace(/\n/g, '<br>')}</p>
                            </div>
                        `;
                }
            }); 
        }

        // Render the comments to the DOM
        const commentsContainer = document.getElementById("comments-container");
        commentsContainer.innerHTML = feedHtml;
        
    } catch (error) {
        console.error("Error fetching comments:", error);
    }
}



// sent new comment POST request

async function sendComment(event) {

    const validationErrors = checkGuestRoomUserCommentValidation();

    const userNameValue = document.getElementById("guest-room-user-name").value.trim();
    const userCommentValue = document.getElementById("guest-room-user-comment").value.trim();

    event.preventDefault();
    if (validationErrors.length > 0){
        alert(validationErrors.join('\n'));
    } 
    else {
        fetch('createComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userNameValue,
                comment: userCommentValue
            })
        })

    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    alert("Благодарю за отзыв. Ваш комментарий успешно отправлен!");
    guestRoomCommentForm.reset();
    } 
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