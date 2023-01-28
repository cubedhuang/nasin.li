import { error, json } from '@sveltejs/kit';

import { prisma } from '$lib/db';
import { userDataSchema } from '$lib/validators';
import type { RequestHandler } from './$types';

export const POST = (async ({ locals, request }) => {
	const session = await locals.getSession();

	if (!session?.user?.email) {
		throw error(401, 'Unauthorized');
	}

	const data = userDataSchema.parse(await request.json());

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
		include: { nasin: true }
	});

	if (!user) {
		throw error(404, 'User not found');
	}

	if (
		data.url !== user.url &&
		(await prisma.user.findUnique({ where: { url: data.url } }))
	) {
		throw error(409, 'User URL is already taken');
	}

	const newUser = await prisma.user.update({
		where: { id: user.id },
		data: { name: data.name, url: data.url }
	});

	return json(newUser);
}) satisfies RequestHandler;
