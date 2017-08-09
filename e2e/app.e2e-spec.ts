import { SlDevtestPage } from './app.po';

describe('sl-devtest App', () => {
  let page : SlDevtestPage;

  beforeEach(() => {
    page = new SlDevtestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
