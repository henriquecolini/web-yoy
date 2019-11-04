interface ImageList {
    [key: string]: string;
}

interface LoadedList {
    [key: string]: LoadedImage;
}

const images: ImageList = {
	"capital": "capital.png",
	"forest": "forest0.png"
}

const loaded: LoadedList = {};

const basePath = "src/images/";

export class LoadedImage {

	private _image: HTMLImageElement;	
	private listeners: (() => void)[];
	private alreadyLoaded = false;

	constructor(src: string) {
		this._image = new Image();
		this._image.src = src;
		this.listeners = [];
		this._image.onload = () => {
			for (let i = 0; i < this.listeners.length; i++) this.listeners[i]();
			this.alreadyLoaded = true;
		};
	}

	get image() {
		return this._image;
	}

	set onload(listener: () => void) {
		if (!this.alreadyLoaded) {
			this.listeners.push(listener);
		}
		else {
			listener();
		}
	}

}

export default class Images {
	public static piece(type: string): LoadedImage {
		if (!images[type]) return undefined;
		let path = basePath+images[type];
		if (!loaded[type]) {			
			loaded[type] = new LoadedImage(path);
		}
		return loaded[type];
	}
}

