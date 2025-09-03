import SELECTORS from './selectors';

declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Login
			 * @example cy.login('test@yopmail.com', '2222222')
			 */
			login(email: string, password: string): Chainable;

			/**
			 * Drag&drop
			 * @example cy.dragIngredient(`${SELECTORS.buns} ${SELECTORS.ingredientLink}`, 'first')
			 */
			dragIngredient(
				selector: keyof typeof SELECTORS | string,
				position?: 'first' | 'last'
			): Chainable;
		}
	}
}

export {};
