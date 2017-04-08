import { WebLandingPage } from './app.po';

describe('web-landing App', function() {
  let page: WebLandingPage;

  beforeEach(() => {
    page = new WebLandingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
