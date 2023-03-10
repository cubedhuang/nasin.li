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

	return { users };
}) satisfies PageServerLoad;
