export class Shape {
	element: string;
	fill: string;
}

export class Circle extends Shape {
	cx: number;
	cy: number;
	r: number;

	readonly element = 'circle';

	constructor({ cx, cy, r, fill }) {
		super();

		this.cx = cx;
		this.cy = cy;
		this.r = r;
		this.fill = fill;
	}
}
