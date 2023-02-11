import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

import { prisma } from '$lib/db';

export const load = (async ({ parent }) => {
	const { session } = await parent();

	if (!session?.user?.email) {
		throw redirect(302, '/open');
	}

	const user = await prisma.user.findUnique({
		where: {
			email: session.user.email
		},
		include: {
			nasin: true,
			accounts: true
		}
	});

	if (!user) {
		throw redirect(302, '/open');
	}

	return { user };
}) satisfies LayoutServerLoad;
