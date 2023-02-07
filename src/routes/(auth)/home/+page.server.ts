import { SnowTransfer } from 'snowtransfer';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { env } from '$env/dynamic/private';

const client = new SnowTransfer(env.DISCORD_TOKEN);

export const load = (async ({ parent }) => {
	const { user } = await parent();

	if (!user.nasin?.length) {
		throw redirect(302, '/create');
	}

	const discordUser = await client.user.getUser(
		user.accounts[0].providerAccountId
	);

	return { discordUser };
}) satisfies PageServerLoad;
