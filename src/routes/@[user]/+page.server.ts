import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { prisma } from '$lib/db';

export const load = (async ({ params }) => {
	const user = await prisma.user.findUnique({
		where: {
			url: params.user
		},
		select: {
			name: true,
			url: true,
			image: true,
			nasin: {
				include: {
					nimi: {
						orderBy: { order: 'asc' }
					},
					details: {
						orderBy: { order: 'asc' }
					}
				}
			}
		}
	});

	if (!user?.nasin) {
		throw error(404, 'User not found');
	}

	return { user, nasin: user.nasin };
}) satisfies PageServerLoad;
