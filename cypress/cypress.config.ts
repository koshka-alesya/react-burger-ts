import { DEV_SERVER_URL, GIT_BASE_URL } from '@/utils/route';
import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: `${DEV_SERVER_URL}${GIT_BASE_URL}/`,
	},
});
