import { error, json } from '@sveltejs/kit';

import { prisma } from '$lib/db';
import { formatError, nasinDataSchema } from '$lib/validators';
import type { RequestHandler } from './$types';

export const POST = (async ({ locals, request }) => {
	const session = await locals.getSession();

	if (!session?.user?.email) {
		throw error(401, 'Unauthorized');
	}

	const check = nasinDataSchema.safeParse(await request.json());

	if (!check.success) {
		throw error(400, formatError(check.error));
	}

	const data = check.data;

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
		include: { nasin: true }
	});

	if (!user) {
		throw error(404, 'User not found');
	}

	if (
		data.id !== undefined &&
		!user.nasin.some(nasin => nasin.id === data.id)
	) {
		throw error(403, 'Forbidden');
	}

	if (
		data.id !== undefined &&
		user.nasin.some(
			nasin => nasin.name === data.name && nasin.id !== data.id
		)
	) {
		throw error(409, 'Nasin with that name already exists');
	}

	if (
		user.nasin.some(
			nasin => nasin.path === data.path && nasin.id !== data.id
		)
	) {
		throw error(409, 'Nasin with that path already exists');
	}

	const nasin = await prisma.$transaction(
		async tx => {
			const nasin = await tx.nasin.upsert({
				where: {
					id: data.id,
					name_userId: data.id
						? undefined
						: { name: data.name, userId: user.id }
				},
				update: {
					name: data.name,
					path: data.path,
					commentary: data.commentary
				},
				create: {
					name: data.name,
					path: data.path,
					userId: user.id,
					commentary: data.commentary
				}
			});

			if (!data.patch) {
				// Delete nimi no longer in data
				await tx.nimi.deleteMany({
					where: {
						nasinId: nasin.id,
						nimi: { notIn: data.nimi.map(n => n.nimi) }
					}
				});

				// Update existing nimi
				await Promise.all(
					data.nimi.map(async (n, i) => {
						await tx.nimi.upsert({
							where: {
								nimi_nasinId: {
									nimi: n.nimi,
									nasinId: nasin.id
								}
							},
							update: {
								order: i,
								type: { set: n.type },
								definition: n.definition,
								commentary: n.commentary
							},
							create: {
								nasinId: nasin.id,
								nimi: n.nimi,
								order: i,
								type: n.type,
								definition: n.definition,
								commentary: n.commentary
							}
						});
					})
				);

				// Delete details no longer in data
				await tx.nasinDetails.deleteMany({
					where: {
						nasinId: nasin.id,
						title: { notIn: data.details.map(d => d.title) }
					}
				});

				// Update existing details
				await Promise.all(
					data.details.map(async (d, i) => {
						await tx.nasinDetails.upsert({
							where: {
								title_nasinId: {
									title: d.title,
									nasinId: nasin.id
								}
							},
							update: {
								order: i,
								content: d.content
							},
							create: {
								nasinId: nasin.id,
								title: d.title,
								order: i,
								content: d.content
							}
						});
					})
				);
			}

			return await tx.nasin.findUnique({
				where: { id: nasin.id }
			});
		},
		{ timeout: 10000 }
	);

	return json(nasin);
}) satisfies RequestHandler;

export const DELETE = (async ({ locals, request }) => {
	const session = await locals.getSession();

	if (!session?.user?.email) {
		throw error(401, 'Unauthorized');
	}

	const data = await request.json();

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
		include: { nasin: true }
	});

	if (!user) {
		throw error(404, 'User not found');
	}

	if (!user.nasin.some(nasin => nasin.id === data.id)) {
		throw error(403, 'Forbidden');
	}

	await prisma.nasin.delete({
		where: { id: data.id }
	});

	return json({ success: true });
}) satisfies RequestHandler;
