import imagesArray from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImgEl = document.querySelector('.lightbox__image');



const galleryItemsMarkup = createGalleryItem(imagesArray);

gallery.insertAdjacentHTML('afterbegin', galleryItemsMarkup)
gallery.addEventListener('click', opModal);
lightboxEl.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModal)

//створення елементів
function createGalleryItem(imagesArray) {
    return imagesArray.map(({preview, original, description}, index) => {
       //атрибути
        return `
            <li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${original}"
                >
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                        data-index="${index}"
                    />
                </a>
            </li>
    `}).join('');
};

// слухач на модалці
function opModal(event) {
    if (!event.target.classList.contains('gallery__image')) {
        return;
    };
    event.preventDefault()
    lightboxEl.classList.add('is-open');
    lightboxImgEl.setAttribute('src', event.target.getAttribute('data-source'));
    lightboxImgEl.setAttribute('alt', event.target.getAttribute('alt'));
    lightboxImgEl.setAttribute('data-index', event.target.getAttribute('data-index'));

    // console.log(lightboxImgEl)
    // console.log(Number(lightboxImgEl.getAttribute('data-index')))
    
};

function formattingModal() {
    lightboxEl.classList.remove('is-open');
    lightboxImgEl.setAttribute('src', '');
    lightboxImgEl.setAttribute('alt', '');
    lightboxImgEl.removeAttribute('data-index');
};


function closeModal(evt) {
    //закрити модалку чрез overlay
    if (evt.target.classList.contains('lightbox__overlay')) {
        formattingModal();
    };
    //закрити модалку чрез крестик
    if (evt.target.classList.contains('lightbox__button')) {
        formattingModal();
    };
    // закрити модалку чрез ESC
    if (evt.code === 'Escape') {
        formattingModal();
    };
};

// ///////////////////// завдання із * ///////////////////////

// // гортання стрілками
const flippingImages = e => {

    
    if (!lightboxEl.classList.contains('is-open')) return;

    const imgArrLength = imagesArray.length;
    let modIndex = Number(lightboxImgEl.getAttribute('data-index'));
    
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


    lightboxImgEl.setAttribute('src', imagesArray[arrElIdx].original);
    lightboxImgEl.setAttribute('alt', imagesArray[arrElIdx].description);
    lightboxImgEl.setAttribute('data-index', arrElIdx);

    // відладка //
    // console.log(arrElIdx);
}

window.addEventListener('keydown', flippingImages);