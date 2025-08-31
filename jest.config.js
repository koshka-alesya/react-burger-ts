/* eslint-disable no-undef */
const { createDefaultPreset } = require('ts-jest');
/* eslint-enable no-undef */

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
	testEnvironment: 'node',
	transform: {
		...tsJestTransformCfg,
	},
};
