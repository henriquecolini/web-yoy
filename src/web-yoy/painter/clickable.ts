export default interface Clickable {
	isHovering(x: number, y: number): boolean;
	onClick(): void;
}