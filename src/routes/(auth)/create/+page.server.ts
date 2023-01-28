import { prisma } from '$lib/db';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { user } = await parent();

	if (!user.nasin) {
		return { nasin: null };
	}

	return {
		nasin: await prisma.nasin.findUnique({
			where: { id: user.nasin.id },
			include: {
				nimi: { orderBy: { order: 'asc' } },
				details: { orderBy: { order: 'asc' } }
			}
		})
	};
}) satisfies PageServerLoad;
