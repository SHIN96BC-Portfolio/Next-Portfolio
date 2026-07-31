import handlers from '@Src/shared/libs/mocks/handler';
import { setupWorker } from 'msw/browser';

export const mockWorker = setupWorker(...handlers);

export default undefined;
