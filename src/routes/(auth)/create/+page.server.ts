import { prisma } from '$lib/db';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { user } = await parent();

	if (user.nasin) {
		return {
			nasin: await prisma.nasin.findUnique({
				where: { id: user.nasin.id },
				include: { nimi: { orderBy: { order: 'asc' } } }
			})
		};
	}

	return {
		nasin: null
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
	}
} satisfies Actions;
