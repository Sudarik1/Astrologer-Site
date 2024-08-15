
// set up

// database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


// grabbing elements

// database
const databaseSettings = {
    databaseURL: "https://astrologer-site-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const dataApp = initializeApp(databaseSettings)
const database = getDatabase(dataApp)

const usersApplicationDatabase = ref(database, 'applications')

// header's motto line breaks
const mediaQuery1000 = window.matchMedia("(max-width: 1000px)");
const mediaQuery1320 = window.matchMedia("(max-width: 1320px)");

// application form 
const applicationForm = document.getElementById("application-form");

// footer's link
const mailLinkFooter = document.getElementById("mail-link-footer")



// event listeners

// header's motto line breaks
mediaQuery1000.addEventListener("change", handleMediaQueryChange1000)
mediaQuery1320.addEventListener("change", handleMediaQueryChange1320);


async function sendEmail(){
    try {
        const response = await fetch('http://localhost:8000/send');
        const data = await response.text();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
}
//form submission
applicationForm.addEventListener("submit", function(event) {

    const validationErrors = checkApplicationFormValidation();
    event.preventDefault();

    const userName = document.getElementById('user-name').value;
    const userEmail = document.getElementById('user-email').value;
    const userPhone = document.getElementById('user-phone').value;
    
    if (validationErrors.length > 0){
        alert(validationErrors.join('\n'));
    } else {
        const newApplicationRef = push(usersApplicationDatabase);
        set(newApplicationRef, {
            name: userName,
            email: userEmail,
            phone: userPhone
        });
        sendEmail()
    }

    alert("Ваша заявка отправлена!");
    applicationForm.reset();

});

// footer's link
mailLinkFooter.addEventListener('click', function() {
    
    const mailToCopy = 's-olonichev@yandex.ru';

    navigator.clipboard.writeText(mailToCopy)
    
    alert("Адрес электронной почты скопирован в буфер обмена")

});



//render to DOM



// adaptivity
function handleMediaQueryChange1000(event) {
    handleMottoLineBreaks(event)
}

// header's motto line breaks
function handleMottoLineBreaks(event) {
    const mottoHeaderLineBreak = Array.from(document.getElementsByClassName("motto-header-line-break"))
    if (event.matches) {
        mottoHeaderLineBreak.forEach(br => br.style.display = 'inline');
    } else {
        mottoHeaderLineBreak.forEach(br => br.style.display = 'none');
    }
}
handleMediaQueryChange1000(mediaQuery1000)

function handleMediaQueryChange1320(event) {
    const mottoHeaderLineBreak = Array.from(document.getElementsByClassName("motto-header-line-break"))

    if (event.matches) {
        mottoHeaderLineBreak.forEach(br => br.style.display = 'none');
    } else {
        mottoHeaderLineBreak.forEach(br => br.style.display = 'inline');
    }
}
handleMediaQueryChange1320(mediaQuery1320);



// other

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

