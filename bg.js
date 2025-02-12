const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImgLoad() {
    console.log("finished loading");
}

function paintImage(imageNumber) {
    const image = new Image();
    image.src = `/images/${imageNumber + 1}.jpg`;
    body.appendChild(image);
    image.classList.add('bgImage');
    image.addEventListener("loaded", handleImgLoad);

}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();