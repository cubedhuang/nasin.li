import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { prisma } from '$lib/db';

export const load = (async ({ params }) => {
	const user = await prisma.user.findUnique({
		where: {
			url: params.user
		},
		include: {
			nasin: {
				include: {
					nimi: true,
					details: true
				}
			}
		}
	});

	if (!user?.nasin) {
		throw error(404, 'User not found');
	}

	return { user, nasin: user.nasin };
}) satisfies PageServerLoad;
