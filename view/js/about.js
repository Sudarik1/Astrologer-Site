
// grabbing elements

const diplomPhotoArray = document.querySelectorAll('.diplom-photo')

// header's motto line breaks
const mediaQuery1000 = window.matchMedia("(max-width: 1000px)");

// event listeners

diplomPhotoArray.forEach(photo =>{
    photo.addEventListener('click', handleDiplomsPhotoExpansion) 
})

// header's motto line breaks
mediaQuery1000.addEventListener("change", handleMediaQueryChange1000)



//render to DOM

// diploms expansion
function handleDiplomsPhotoExpansion(event){
    const clickedPhotoDiv = event.target.parentElement;
    
        if (clickedPhotoDiv.classList.contains('expanded')){
            clickedPhotoDiv.classList.remove('expanded');
        } else {
            diplomPhotoArray.forEach(photo => photo.classList.remove('expanded'));
            clickedPhotoDiv.classList.add('expanded');
        }
}

// adaptivity
function handleMediaQueryChange1000(event) {
    disableDiplomsPhotoExpand(event)
}

// diploms photo expansion
function disableDiplomsPhotoExpand(event) {
    if (event.matches) {
        diplomPhotoArray.forEach (photo =>
            photo.removeEventListener('click', handleDiplomsPhotoExpansion)
        )
    }
    else {
        diplomPhotoArray.forEach (photo =>
            photo.addEventListener('click', handleDiplomsPhotoExpansion)
        )
    }
}