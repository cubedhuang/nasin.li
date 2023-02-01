import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { prisma } from '$lib/db';

export const load = (async ({ params, parent }) => {
	const { session } = await parent();

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

	let owner = false;

	if (session?.user?.email) {
		const ownerUser = await prisma.user.findUnique({
			where: {
				email: session.user.email
			},
			select: {
				url: true
			}
		});

		if (ownerUser?.url === params.user) {
			owner = true;
		}
	}

	return { user, owner };
}) satisfies PageServerLoad;
