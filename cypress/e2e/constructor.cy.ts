/// <reference types="cypress" />

const url = 'http://localhost:5173/';
const user = {
	email: 'test@yopmail.com',
	password: '2222222',
};
const orderId = '87506';

describe('constructor spec', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
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

		cy.visit(url);
	});

	it('should be available on localhost:5173', function () {
		cy.visit(url);
	});

	it('show ingredient details', () => {
		cy.contains('Соберите бургер');

		cy.get('[data-cy=ingredient-link]').first().click();
		cy.get('[data-cy=modal]').contains('Детали ингредиента');
		cy.get('[data-cy=modal-close]').click();
		cy.get('[data-cy=modal]', { timeout: 500 }).should('not.exist');
	});

	it('should have buns, fillings and sauces', () => {
		cy.get('[data-cy=ingredients]').should('exist');
		cy.get('[data-cy=ingredients]').contains('Булки');
		cy.get('[data-cy=ingredients]').contains('Начинки');
		cy.get('[data-cy=ingredients]').contains('Соусы');
	});

	it('should create a burger order', () => {
		cy.get('[data-cy=buns]')
			.find('[data-cy=ingredient-link]')
			.first()
			.trigger('dragstart');
		cy.get('[data-cy=burger-component]').trigger('drop');

		// create order
		cy.get('[data-cy=buns]')
			.find('[data-cy=ingredient-link]')
			.last()
			.trigger('dragstart');
		cy.get('[data-cy=burger-component]').trigger('drop');

		cy.get('[data-cy=sauces]')
			.find('[data-cy=ingredient-link]')
			.first()
			.trigger('dragstart');
		cy.get('[data-cy=burger-component]').trigger('drop');

		cy.get('[data-cy=mains]')
			.find('[data-cy=ingredient-link]')
			.first()
			.trigger('dragstart');
		cy.get('[data-cy=burger-component]').trigger('drop');

		cy.get('[data-cy=mains]')
			.find('[data-cy=ingredient-link]')
			.last()
			.trigger('dragstart');
		cy.get('[data-cy=burger-component]').trigger('drop');

		cy.get('[data-cy=burger-constructor-price]').contains('5644');
		cy.get('[data-cy=burger-constructor-create-order]').click();

		// login page
		cy.contains('Вход');
		cy.get('[name=email]').type(user.email);
		cy.get('[name=password]').type(user.password);
		cy.get('[data-cy=login-button]', { timeout: 1000 }).click();

		// create order with auth
		cy.get('[data-cy=burger-constructor-create-order]', {
			timeout: 2000,
		}).click();
		cy.get('[data-cy=order-details]', { timeout: 20000 }).should('exist');
		cy.get('[data-cy=order-details-number]').contains(orderId);

		cy.get('[data-cy=modal-close]').click();
		cy.get('[data-cy=modal]', { timeout: 500 }).should('not.exist');
		cy.contains('Соберите бургер');
	});
});
