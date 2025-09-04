import SELECTORS from './selectors';

Cypress.Commands.add('login', (email: string, password: string) => {
	cy.contains('Вход', { timeout: 3000 });
	cy.get(SELECTORS.emailInput).type(email);
	cy.get(SELECTORS.passwordInput).type(password);
	cy.get(SELECTORS.loginButton).click();
});

Cypress.Commands.add(
	'dragIngredient',
	(selector: string, position: 'first' | 'last' = 'first') => {
		const dataTransfer = new DataTransfer();
		if (position === 'first') {
			cy.get(selector).first().trigger('dragstart', { dataTransfer });
		} else {
			cy.get(selector).last().trigger('dragstart', { dataTransfer });
		}
		cy.get(SELECTORS.burgerComponent).trigger('drop', { dataTransfer });
	}
);
