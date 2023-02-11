import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session } = await parent();

	if (session?.user) {
		throw redirect(302, '/tomo');
	}
}) satisfies PageServerLoad;
