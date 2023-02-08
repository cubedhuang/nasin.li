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
				select: {
					id: true,
					path: true,
					name: true
				}
			}
		}
	});

	if (!user?.nasin?.length) {
		throw error(404, 'Nasin not found');
	}

	const exists = user.nasin.find(nasin => nasin.path === (params.path ?? ''));

	if (!exists) {
		return {
			full: false as const,
			user,
			meta: {
				title: `${user.name}`,
				description: `lipu nasin tan ${user.name}!`
			}
		};
	}

	const nasin = await prisma.nasin.findUnique({
		where: {
			id: exists.id
		},
		include: {
			nimi: {
				orderBy: { order: 'asc' }
			},
			details: {
				orderBy: { order: 'asc' }
			}
		}
	});

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

	return {
		full: true as const,
		user,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		nasin: nasin!,
		owner,
		meta: {
			title: user.name,
			description: `lipu ni li nasin pi ${
				params.path ? nasin?.name : user.name
			}!`,
			image: user.image
		}
	};
}) satisfies PageServerLoad;
