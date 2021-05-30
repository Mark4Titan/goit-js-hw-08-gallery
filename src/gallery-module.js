import imagesArray from './gallery-items.js';

const imgArrLength = imagesArray.length;



let objectLink = {
    imagesList: document.querySelector(".js-gallery"),
    modalImg: document.querySelector(".lightbox__image"),
    modalHeadElement: document.querySelector(".js-lightbox"),
    closeModalBtn: document.querySelector("button[data-action='close-lightbox']"),
    overlayCloseBtn: document.querySelector(".lightbox__overlay"),
}



imagesArray.map(function (currentItem, index) {
    
    let galleryItem;
    let galleryLink;
    let galleryImg;

    //створення елементів
    galleryItem = document.createElement('li');
    galleryItem.classList.add("gallery__item");

    galleryLink = document.createElement('a');
    galleryLink.classList.add("gallery__link");

    galleryImg = document.createElement('img');
    galleryImg.classList.add("gallery__image");

    //атрибути
    galleryImg.setAttribute('src', currentItem.preview);
    galleryImg.setAttribute('data-source', currentItem.original);
    galleryImg.setAttribute('alt', currentItem.description);
    galleryImg.setAttribute('data-index', index);

    // додав elemets до DOM Html
    objectLink.imagesList.appendChild(galleryItem);
    galleryItem.appendChild(galleryLink);
    galleryLink.appendChild(galleryImg);

});
 
// слухач на модалці
const opModal = (event) => {

    event.preventDefault();

    if (event.target.nodeName !== 'IMG') return;

    const imageRef = event.target;
    const largeImgURL = imageRef.dataset.source;

    // відладка //
    // console.log(imageRef)
    // console.log(imageRef.dataset.index)
    // console.log(largeImgURL)

    objectLink.modalImg.src = largeImgURL;
    objectLink.modalImg.alt = imageRef.alt;
    objectLink.modalImg.dataset.index = imageRef.dataset.index;
    objectLink.modalHeadElement.classList.add('is-open');
};

objectLink.imagesList.addEventListener('click', opModal);




const formattingModal = (event) => {

    if (event.key !== 'Escape') return;

    objectLink.modalHeadElement.classList.remove('is-open');
    objectLink.modalImg.src = '';
    objectLink.modalImg.alt = '';
    objectLink.modalImg.dataset.index = '';

};

const closeModal = () => {

    objectLink.modalHeadElement.classList.remove('is-open');
    window.removeEventListener('keydown', formattingModal); 
    window.removeEventListener('keydown', flippingImages);
};

//закрити модалку чрез крестик
objectLink.closeModalBtn.addEventListener('click', closeModal);

//закрити модалку чрез overlay
objectLink.overlayCloseBtn.addEventListener('click', closeModal);

// закрити модалку чрез ESC
window.addEventListener('keydown', formattingModal);



///////////////////// завдання із * ///////////////////////

// гортання стрілками
const flippingImages = e => {

    
    if (!objectLink.modalHeadElement.classList.contains('is-open')) return;
    
    let modIndex = Number(objectLink.modalImg.dataset.index);
    
    // відладка //
    // console.log(modIndex);
    // console.log(typeof (modIndex))
    // console.log((modIndex - 1))
    // console.log('imgArrLength', imgArrLength)
    // console.log('imagesArray[modIndex - 1] = ', imagesArray[modIndex - 1])    
    

    if (e.key == 'ArrowLeft') {        
        --modIndex;
        if (modIndex !== -1) { NextImg(modIndex); return;};
        if (modIndex === -1) { NextImg(imgArrLength - 1); return;};
    }
    

    if (e.key == 'ArrowRight') {
        ++modIndex;
        if (modIndex !== imgArrLength) { NextImg(modIndex); return;};
        if (modIndex === imgArrLength) { NextImg(0); return;};
    }     
}

function NextImg(arrElIdx) {
    objectLink.modalImg.src = imagesArray[arrElIdx].original;
    objectLink.modalImg.alt = imagesArray[arrElIdx].description;
    objectLink.modalImg.dataset.index = arrElIdx;

    // відладка //
    // console.log(arrElIdx);
}

window.addEventListener('keydown', flippingImages);