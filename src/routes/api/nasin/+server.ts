import { error, json } from '@sveltejs/kit';

import { prisma } from '$lib/db';
import { nasinDataSchema } from '$lib/validators';
import type { RequestHandler } from './$types';

export const POST = (async ({ locals, request }) => {
	const session = await locals.getSession();

	if (!session?.user?.email) {
		throw error(401, 'Unauthorized');
	}

	const data = nasinDataSchema.parse(await request.json());

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
		include: { nasin: true }
	});

	if (!user) {
		throw error(404, 'User not found');
	}

	const nasin = await prisma.$transaction(async tx => {
		const nasin = await tx.nasin.upsert({
			where: { userId: user.id },
			update: {
				commentary: data.commentary
			},
			create: {
				userId: user.id,
				commentary: data.commentary
			}
		});

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
						nimi_nasinId: { nimi: n.nimi, nasinId: nasin.id }
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
						title_nasinId: { title: d.title, nasinId: nasin.id }
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

		return await tx.nasin.findUnique({
			where: { id: nasin.id },
			include: {
				nimi: { orderBy: { order: 'asc' } },
				details: { orderBy: { order: 'asc' } }
			}
		});
	});

	return json(nasin);
}) satisfies RequestHandler;
