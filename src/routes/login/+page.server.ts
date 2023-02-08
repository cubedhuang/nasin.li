import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session } = await parent();

	if (session?.user) {
		throw redirect(302, '/home');
	}

	return {
		meta: {
			title: 'login – nasin.li',
			description: 'lipu ni la, sina ken open pali e lipu nasin.'
		}
	};
}) satisfies PageServerLoad;
