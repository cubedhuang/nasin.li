// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

// https://github.com/isaacHagoel/svelte-dnd-action#typescript
type Item = import('svelte-dnd-action').Item;
type DndEvent<ItemType = Item> = import('svelte-dnd-action').DndEvent<ItemType>;
declare global {
	declare namespace svelte.JSX {
		interface HTMLAttributes<T> {
			onconsider?: (
				event: CustomEvent<DndEvent<ItemType>> & {
					target: EventTarget & T;
				}
			) => void;
			onfinalize?: (
				event: CustomEvent<DndEvent<ItemType>> & {
					target: EventTarget & T;
				}
			) => void;
		}
	}
}
export {};
