import { TIngredient, TOrder, TOrderProcessed } from './types';

export function processOrder(
	order: TOrder,
	ingredients: TIngredient[]
): TOrderProcessed {
	const ingredientImages: string[] = [];
	let totalPrice = 0;

	const counts: Record<string, number> = {};
	order.ingredients.forEach((id) => {
		counts[id] = (counts[id] || 0) + 1;

		const ingredient = ingredients.find((el) => el._id === id);
		if (ingredient) {
			ingredientImages.push(ingredient.image_mobile);
		}
	});

	const ingredientsData = Object.entries(counts)
		.map(([id, count]) => {
			const ingredient = ingredients.find((el) => el._id === id);
			if (!ingredient) return null;

			if (ingredient.type === 'bun') {
				totalPrice += ingredient.price;
				return { ...ingredient, count: 2 };
			} else {
				totalPrice += ingredient.price * count;
				return { ...ingredient, count };
			}
		})
		.filter((item): item is TIngredient & { count: number } => item !== null);

	return {
		...order,
		totalPrice,
		ingredientImages,
		ingredientsData,
	};
}

export function processOrders(
	orders: TOrder[],
	ingredients: TIngredient[]
): TOrderProcessed[] {
	return [...orders]
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)
		.map((order) => processOrder(order, ingredients));
}
