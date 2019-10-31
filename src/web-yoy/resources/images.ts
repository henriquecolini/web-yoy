interface ImageList {
    [key: string]: string[];
}

const images: ImageList = {
	"capital": ["capital.png"],
	"forest": ["forest0.png", "forest1.png"]
}

const basePath = "src/images/";

export default class Images {
	public static piece(type: string, level?: number): string {
		let arr = images[type + ((level === undefined) ? "" : ("_" + level))];
		if (!arr) return undefined;
		return basePath+((arr.length == 1) ? arr[0] : (arr[Math.floor(Math.random() * arr.length)]));
	}
}

