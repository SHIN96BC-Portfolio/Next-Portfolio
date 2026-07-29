import handlers from '@FsdShared/config/mock/handlers';
import { setupWorker } from 'msw/browser';

export const mockWorker = setupWorker(...handlers);

export default undefined;
