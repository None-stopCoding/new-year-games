export default class Game {
    constructor({ imagePath }) {
        this._image = new Image();
        this._image.src = imagePath;

        this._image.addEventListener('onload', this.onImageLoad);
    }

    onImageLoad() {
        this._imageWidth = this._image.width;
        this._imageHeight = this._image.height;
    }
}
