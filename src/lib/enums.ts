// Enums reexported from Prisma schema https://github.com/prisma/prisma/issues/12504

import type { NimiType as NimiTypeOrigin } from '@prisma/client';

export type NimiType = NimiTypeOrigin;

export const NimiType = {
	PARTICLE: 'PARTICLE',
	CONTENT: 'CONTENT',
	PREPOSITION: 'PREPOSITION',
	PREVERB: 'PREVERB',
	NUMBER: 'NUMBER',
	OTHER: 'OTHER'
} as const satisfies typeof NimiTypeOrigin;

export const NimiTypes = Object.values(NimiType) satisfies NimiType[] as [
	'PARTICLE',
	'CONTENT',
	'PREPOSITION',
	'PREVERB',
	'NUMBER',
	'OTHER'
];
