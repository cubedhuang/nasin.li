export function key() {
	return Math.random().toString(36).slice(2);
}

const consonants = 'jklmnpstw'.split('');
const vowels = 'aeiou'.split('');
const illegal = ['wu', 'wo', 'ji', 'ti'];
const syllables: string[] = [];

for (const c of consonants) {
	for (const v of vowels) {
		const syllable = c + v;
		if (!illegal.includes(syllable)) {
			syllables.push(c + v);
			syllables.push(c + v + 'n');
		}
	}
}

export function nimiSin() {
	return Array.from({ length: 2 + Math.floor(Math.random() * 2) }, (_, i) => {
		let s = syllables[Math.floor(Math.random() * syllables.length)];
		if (i === 0 && Math.random() < 1 / (consonants.length + 1)) {
			s = s.substring(1);
		}
		return s;
	})
		.join('')
		.replaceAll('nn', 'n')
		.replaceAll('nm', () => (Math.random() < 0.5 ? 'n' : 'm'));
}
