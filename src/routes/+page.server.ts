import type { PageServerLoad } from './$types';

import { prisma } from '$lib/db';

export const load = (async () => {
	const users = await prisma.user.findMany({
		take: 10,
		where: {
			url: { not: null }
		}
	});

	return { users };
}) satisfies PageServerLoad;
