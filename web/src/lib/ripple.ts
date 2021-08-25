interface RippleOptions {
	centered?: boolean;
	disabled?: boolean;
}

function ripple(color, options: RippleOptions = {}) {
	return function (event) {
		const target = event.currentTarget;
		const circle = document.createElement('span');
		const d = Math.max(target.clientWidth, target.clientHeight);

		const removeCircle = () => {
			circle.remove();
			circle.removeEventListener('animationend', removeCircle);
		};

		circle.addEventListener('animationend', removeCircle);
		circle.style.width = circle.style.height = `${d}px`;
		const rect = target.getBoundingClientRect();

		circle.classList.add(`bg-${color}-500`, 'opacity-20');

		if (options.centered) {
			circle.classList.add('ripple-centered', 'absolute', 'top-0', 'left-0', 'right-0', 'bottom-0');
		} else {
			circle.style.left = `${event.clientX - rect.left - d / 2}px`;
			circle.style.top = `${event.clientY - rect.top - d / 2}px`;
			circle.classList.add('ripple-normal');
		}

		circle.classList.add('ripple');

		target.appendChild(circle);
	};
}

export default function r(color = 'primary', options: RippleOptions = {}) {
	return function (node: HTMLElement) {
		const onMouseDown = ripple(color, options);

		if (!options.disabled) {
			node.addEventListener('mousedown', onMouseDown);
		}

		return {
			onDestroy() {
				node.removeEventListener('mousedown', onMouseDown);
			}
		};
	};
}
