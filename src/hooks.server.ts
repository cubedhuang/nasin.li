import Discord from '@auth/core/providers/discord';
import { SvelteKitAuth } from '@auth/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { AUTH_SECRET, DISCORD_ID, DISCORD_SECRET } from '$env/static/private';
import { prisma } from '$lib/db';

export const handle = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		// @ts-expect-error some weird type error happens but it doesn't affect anything
		Discord({
			clientId: DISCORD_ID,
			clientSecret: DISCORD_SECRET
		})
	],

	// https://github.com/nextauthjs/next-auth/discussions/6074
	session: {
		strategy: 'database',
		maxAge: 30 * 24 * 60 * 60, // 30 days
		updateAge: 24 * 60 * 60, // 24 hours
		generateSessionToken() {
			return crypto.randomUUID();
		}
	},
	secret: AUTH_SECRET
}) satisfies Handle;
