import { error, json } from '@sveltejs/kit';

import { prisma } from '$lib/db';
import { userDataSchema } from '$lib/validators';
import type { RequestHandler } from './$types';

export const POST = (async ({ cookies, request }) => {
	const data = userDataSchema.parse(await request.json());

	const sessionToken = cookies.get('next-auth.session-token');
	const session = await prisma.session.findFirst({
		where: { expires: { gte: new Date() }, sessionToken },
		select: { userId: true, user: { select: { url: true } } }
	});

	if (!sessionToken || !session || session.userId !== data.userId) {
		throw error(401, 'Unauthorized');
	}

	if (
		data.url !== session.user.url &&
		(await prisma.user.findUnique({ where: { url: data.url } }))
	) {
		throw error(409, 'User URL is already taken');
	}

	const user = await prisma.user.update({
		where: { id: data.userId },
		data: { name: data.name, url: data.url }
	});

	return json(user);
}) satisfies RequestHandler;
