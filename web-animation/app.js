if (document.body.animate) {
	document.addEventListener('click', ({ clientX, clientY }) => fire(clientX, clientY, 50));
}

const shapes = [
	// circle
	element => {
		element.style.borderRadius = '50%';
	},

	// square - no transformations
	() => {},

	// triangle
	(element, size, color) => {
		element.style.width = '0px';
		element.style.height = '0px';
		element.style.borderStyle = 'solid';
		element.style.borderColor = `transparent transparent ${color} transparent`;
		element.style.borderWidth = `0 ${size/2}px ${size*0.85}px ${size/2}px`;
		element.style.backgroundColor = 'transparent';
	}

];

function fire(clientX, clientY, particlesCount) {
	for (let i = 0; i < particlesCount; i++) {
		createParticle(clientX, clientY);
	}
}

function createParticle(clientX, clientY) {
	const particle = document.createElement('div');
	particle.classList.add('particle');

	const size = Math.floor(Math.random() * 25 + 5);
	particle.style.width = `${size}px`;
	particle.style.height = `${size}px`;

	const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
	particle.style.backgroundColor = color;

	const shape = Math.floor(Math.random() * shapes.length);
	shapes[shape](particle, size, color);

	const destinationX = clientX + (Math.random() - 0.5) * 2 * 85;
	const destinationY = clientY + (Math.random() - 0.5) * 2 * 85;

	const animation = particle.animate([
		{
			transform: `translate(${clientX - size / 2}px, ${clientY - size / 2}px)`,
			opacity: 1
		},
		{
			transform: `translate(${destinationX - size / 2}px, ${destinationY - size / 2}px`,
			opacity: 0
		}
	], {
		duration: 500 + Math.random() * 1500,
		easing: 'cubic-bezier(0, .9, .57, 1)',
		delay: Math.random() * 200
	});

	animation.addEventListener('finish', () => {
		particle.remove()
	});

	document.body.appendChild(particle);
}
