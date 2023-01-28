import { NimiTypes } from '$lib/enums';
import { z } from 'zod';

export function formatError(error: z.ZodError) {
	return error.errors
		.map(e => `Error at '${e.path.join('.')}': ${e.message}`)
		.join('\n');
}

export const nimiDataSchema = z.object({
	nimi: z.string().min(1).max(100),
	type: z
		.array(z.enum(NimiTypes))
		.refine(types => new Set(types).size === types.length, {
			message: 'nimi types must be unique'
		}),
	definition: z.string().min(1).max(500),
	commentary: z.string().max(500).nullable()
});

export const nasinDetailsDataSchema = z.object({
	title: z.string().min(1).max(100),
	content: z.string().min(1).max(2000)
});

export const nasinDataSchema = z.object({
	userId: z.string().cuid(),
	commentary: z.string().max(2000),
	details: z
		.array(nasinDetailsDataSchema)
		.max(20)
		.refine(
			details =>
				new Set(details.map(d => d.title)).size === details.length,
			{ message: 'titles must be unique' }
		),
	nimi: z
		.array(nimiDataSchema)
		.max(300)
		.refine(nimi => new Set(nimi.map(n => n.nimi)).size === nimi.length, {
			message: 'nimi must be unique'
		})
});

export const userUrlSchema = z
	.string()
	.min(3)
	.max(50)
	.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
		message: "user url must be 'kebab-case'"
	});

export const userDataSchema = z.object({
	userId: z.string().cuid(),
	name: z.string().min(1).max(100),
	url: userUrlSchema
});
