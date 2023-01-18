import { prisma } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const user = await prisma.user.findUnique({
		where: {
			url: params.user
		},
		include: {
			nasin: true
		}
	});

	if (!user) {
		throw error(404, 'User not found');
	}

	return { user };
}) satisfies PageServerLoad;
