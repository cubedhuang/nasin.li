import { prisma } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { user } = await parent();

	if (!user.nasin) {
		return { nasin: null };
	}

	return {
		nasin: await prisma.nasin.findMany({
			where: { userId: user.id },
			include: {
				nimi: { orderBy: { order: 'asc' } },
				details: { orderBy: { order: 'asc' } }
			}
		})
	};
}) satisfies PageServerLoad;
