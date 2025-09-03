import SELECTORS from '../support/selectors';

/// <reference types="cypress" />

const user = {
	email: 'test@yopmail.com',
	password: '2222222',
};

const ingredient = {
	_id: '643d69a5c3f7b9001cfa093c',
	name: 'Краторная булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	__v: 0,
};

const orderId = '87506';

describe('constructor spec', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
			'getIngredients'
		);
		cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as(
			'postLogin'
		);
		cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
			'postOrder'
		);

		window.localStorage.setItem(
			'refreshToken',
			JSON.stringify('test-refreshToken')
		);
		window.localStorage.setItem(
			'accessToken',
			JSON.stringify('test-accessToken')
		);

		cy.visit('/');
		cy.wait('@getIngredients');

		cy.get(SELECTORS.ingredientLink).as('ingredientLink');
		cy.get(SELECTORS.ingredients).as('ingredients');
		cy.get(SELECTORS.burgerPrice).as('burgerPrice');
		cy.get(SELECTORS.createOrderButton).as('createOrderButton');
	});

	it('show ingredient details', () => {
		cy.contains('Соберите бургер');

		cy.get('@ingredientLink').first().click();

		cy.get(SELECTORS.modal).as('modal');

		cy.get('@modal').contains('Детали ингредиента');
		cy.get('@modal').find(SELECTORS.ingredientName).contains(ingredient.name);
		cy.get('@modal')
			.find(SELECTORS.ingredientProteins)
			.contains(ingredient.proteins);
		cy.get('@modal').find(SELECTORS.ingredientFat).contains(ingredient.fat);
		cy.get('@modal')
			.find(SELECTORS.ingredientCarbohydrates)
			.contains(ingredient.carbohydrates);
		cy.get('@modal')
			.find(SELECTORS.ingredientCalories)
			.contains(ingredient.calories);

		cy.get(SELECTORS.modalClose).click();
		cy.get('@modal', { timeout: 2000 }).should('not.exist');
	});

	it('should have buns, fillings and sauces', () => {
		cy.get('@ingredients').should('exist');
		cy.get('@ingredients').contains('Булки');
		cy.get('@ingredients').contains('Начинки');
		cy.get('@ingredients').contains('Соусы');
	});

	it('should create a burger order', () => {
		cy.dragIngredient(`${SELECTORS.buns} ${SELECTORS.ingredientLink}`, 'first');
		cy.dragIngredient(`${SELECTORS.buns} ${SELECTORS.ingredientLink}`, 'last');
		cy.dragIngredient(
			`${SELECTORS.sauces} ${SELECTORS.ingredientLink}`,
			'first'
		);
		cy.dragIngredient(
			`${SELECTORS.mains} ${SELECTORS.ingredientLink}`,
			'first'
		);
		cy.dragIngredient(`${SELECTORS.mains} ${SELECTORS.ingredientLink}`, 'last');

		cy.get('@burgerPrice', { timeout: 2000 }).should('contain.text', '5644');

		cy.get('@createOrderButton').click();

		cy.login(user.email, user.password);
		cy.wait('@postLogin');

		cy.get('@createOrderButton', { timeout: 5000 }).click();
		cy.wait('@postOrder');

		cy.get(SELECTORS.orderDetails).as('orderDetails');
		cy.get(SELECTORS.orderDetailsNumber).as('orderDetailsNumber');

		cy.get('@orderDetails', { timeout: 20000 }).should('exist');
		cy.get('@orderDetailsNumber', { timeout: 20000 }).should(
			'contain.text',
			orderId
		);

		cy.get(SELECTORS.modalClose).click();
		cy.get(SELECTORS.modal, { timeout: 2000 }).should('not.exist');
		cy.contains('Соберите бургер');
	});
});
