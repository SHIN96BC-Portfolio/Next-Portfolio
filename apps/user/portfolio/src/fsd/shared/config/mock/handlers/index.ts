import contentMockHandler from './content/content-mock-handler';
import fileMockHandler from './file/file-mock-handler';
import siteMockHandler from './site/site-mock-handler';

export const addDelay = async (response: any, delay = 1000) => {
  await new Promise((resolve) => setTimeout(resolve, delay)); // delay 밀리초 대기
  return response;
};

export default [...fileMockHandler, ...siteMockHandler, ...contentMockHandler];
