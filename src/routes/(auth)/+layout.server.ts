import { prisma } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session } = await parent();

	if (!session?.user?.email) {
		throw redirect(302, '/login');
	}

	const user = await prisma.user.findUnique({
		where: {
			email: session.user.email
		},
		include: {
			nasin: true
		}
	});

	if (!user) {
		throw redirect(302, '/login');
	}

	return { user };
}) satisfies LayoutServerLoad;
