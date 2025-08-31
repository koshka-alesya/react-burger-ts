import { GIT_BASE_URL, DEV_SERVER_URL } from '../../src/utils/route';

/// <reference types="cypress" />

const url = `${DEV_SERVER_URL}${GIT_BASE_URL}/`;
// => http://localhost:5173/react-burger-ts/

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

		cy.visit(url);
		cy.wait('@getIngredients');
	});

	it('show ingredient details', () => {
		cy.contains('Соберите бургер');

		cy.get('[data-cy=ingredient-link]').first().click();
		cy.get('[data-cy=modal]').contains('Детали ингредиента');
		cy.get('[data-cy=modal] [data-cy=ingredient-name]').contains(
			ingredient.name
		);
		cy.get('[data-cy=modal] [data-cy=ingredient-proteins]').contains(
			ingredient.proteins
		);
		cy.get('[data-cy=modal] [data-cy=ingredient-fat]').contains(ingredient.fat);
		cy.get('[data-cy=modal] [data-cy=ingredient-carbohydrates]').contains(
			ingredient.carbohydrates
		);
		cy.get('[data-cy=modal] [data-cy=ingredient-calories]').contains(
			ingredient.calories
		);
		cy.get('[data-cy=modal-close]').click();
		cy.get('[data-cy=modal]', { timeout: 2000 }).should('not.exist');
	});

	it('should have buns, fillings and sauces', () => {
		cy.get('[data-cy=ingredients]').should('exist');
		cy.get('[data-cy=ingredients]').contains('Булки');
		cy.get('[data-cy=ingredients]').contains('Начинки');
		cy.get('[data-cy=ingredients]').contains('Соусы');
	});

	it('should create a burger order', () => {
		// add bun
		const dataTransfer1 = new DataTransfer();
		cy.get('[data-cy=buns] [data-cy=ingredient-link]')
			.first()
			.trigger('dragstart', { dataTransfer1 });
		cy.get('[data-cy=burger-component]').trigger('drop', { dataTransfer1 });

		// change bun
		const dataTransfer2 = new DataTransfer();
		cy.get('[data-cy=buns] [data-cy=ingredient-link]')
			.last()
			.trigger('dragstart', { dataTransfer2 });
		cy.get('[data-cy=burger-component]').trigger('drop', { dataTransfer2 });

		// add sauce
		const dataTransfer3 = new DataTransfer();
		cy.get('[data-cy=sauces] [data-cy=ingredient-link]')
			.first()
			.trigger('dragstart', { dataTransfer3 });
		cy.get('[data-cy=burger-component]').trigger('drop', { dataTransfer3 });

		// add main
		const dataTransfer4 = new DataTransfer();
		cy.get('[data-cy=mains] [data-cy=ingredient-link]')
			.first()
			.trigger('dragstart', { dataTransfer4 });
		cy.get('[data-cy=burger-component]').trigger('drop', { dataTransfer4 });

		// add one more main
		const dataTransfer5 = new DataTransfer();
		cy.get('[data-cy=mains] [data-cy=ingredient-link]')
			.last()
			.trigger('dragstart', { dataTransfer5 });
		cy.get('[data-cy=burger-component]').trigger('drop', { dataTransfer5 });

		cy.get('[data-cy=burger-constructor-price]', { timeout: 2000 }).should(
			'contain.text',
			'5644'
		);

		cy.get('[data-cy=burger-constructor-create-order]').click();

		// login
		cy.contains('Вход', {
			timeout: 3000,
		});
		cy.get('[name=email]').type(user.email);
		cy.get('[name=password]').type(user.password);
		cy.get('[data-cy=login-button]', { timeout: 2000 }).click();
		cy.wait('@postLogin');

		cy.get('[data-cy=burger-constructor-create-order]', {
			timeout: 5000,
		}).click();
		cy.wait('@postOrder');

		cy.get('[data-cy=order-details]', { timeout: 20000 }).should('exist');
		cy.get('[data-cy=order-details-number]', { timeout: 20000 }).should(
			'contain.text',
			orderId
		);

		cy.get('[data-cy=modal-close]').click();
		cy.get('[data-cy=modal]', { timeout: 2000 }).should('not.exist');
		cy.contains('Соберите бургер');
	});
});
