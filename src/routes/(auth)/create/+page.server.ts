import { prisma } from '$lib/db';
import type { PageServerLoad } from './$types';

const meta = {
	title: 'create – nasin.li',
	description: 'lipu ni la, sina ken pali e lipu nasin!'
};

export const load = (async ({ parent }) => {
	const { user } = await parent();

	if (!user.nasin) {
		return { nasin: null, meta };
	}

	return {
		nasin: await prisma.nasin.findMany({
			where: { userId: user.id },
			include: {
				nimi: { orderBy: { order: 'asc' } },
				details: { orderBy: { order: 'asc' } }
			}
		}),
		meta
	};
}) satisfies PageServerLoad;
