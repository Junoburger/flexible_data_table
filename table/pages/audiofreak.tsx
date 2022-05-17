import { useEffect, useRef, useState } from "react";

export default function AudioFreak() {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioContextRef = useRef() as any;

	const C_Maj = [
		{ name: "C4", value: 261.63 },
		{ name: "D4", value: 293.66 },
		{ name: "E4", value: 329.63 },
		{ name: "F4", value: 349.23 },
		{ name: "G4", value: 392.0 },
		{ name: "A4", value: 440.0 },
		{ name: "B4", value: 493.88 },
		{ name: "C5", value: 523.25 },
		{ name: "D5", value: 587.33 },
		{ name: "E5", value: 659.26 },
		{ name: "F5", value: 698.46 },
		{ name: "G5", value: 783.99 },
	];

	const playSound = () => {
		const audioContext = new AudioContext();

		//effects

		const master = audioContext.destination;
		const delay = audioContext.createDelay();
		const feedback = audioContext.createGain();
		feedback.gain.value = 0.3;

		const note = {
			vco: audioContext.createOscillator(),
			vca: audioContext.createGain(),
			vco2: audioContext.createOscillator(),
			vca2: audioContext.createGain(),
		};

		const transpose = (freq: any, steps: any) => freq * Math.pow(2, steps / 12);
		const startingPitch = note.vco.frequency.value;
		note.vco2.frequency.value = transpose(startingPitch, 7);

		note.vco.type = "sine";

		const getRandomInt = (min: any, max: any) =>
			Math.floor(Math.random() * (max - min + 1)) + min;

		const noteNumber = getRandomInt(0, C_Maj.length - 1);

		note.vco.frequency.value = C_Maj[noteNumber].value;

		// Connect and start
		note.vco.connect(note.vca);
		note.vco2.connect(note.vca2);

		delay.delayTime.value = 0.4;

		note.vca.connect(master);
		note.vca2.connect(master);

		note.vca.connect(delay);
		note.vca2.connect(delay);

		delay.connect(feedback);
		feedback.connect(delay);
		delay.connect(master);

		note.vca.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + 0.2);
		note.vco.start();
		// Stop the oscillator gradually
		note.vca.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.5);
		note.vco.stop(audioContext.currentTime + 1);

		// Store context and start suspended
		// audioContextRef.current = audioContext;
		// audioContext.suspend();
	};

	return (
		<div>
			<button onClick={() => playSound()}>Start oscillator</button>
			should show some buttons, each triggers a different tone. depending on the reverb or
			delay, the tone changes
		</div>
	);
}
