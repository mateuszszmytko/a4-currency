import { CurrencyPage } from './app.po';

describe('currency App', () => {
  let page: CurrencyPage;

  beforeEach(() => {
    page = new CurrencyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
