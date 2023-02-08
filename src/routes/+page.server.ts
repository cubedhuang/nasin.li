import type { PageServerLoad } from './$types';

import { prisma } from '$lib/db';

export const load = (async () => {
	const users = await prisma.user.findMany({
		take: 20,
		where: {
			url: { not: null }
		},
		select: {
			url: true,
			name: true,
			image: true
		}
	});

	return {
		users,
		meta: {
			title: 'nasin.li',
			description:
				'lipu ni la, sina ken lukin e lipu nasin pi jan ante, li ken pali e lipu pi nasin sina!'
		}
	};
}) satisfies PageServerLoad;
