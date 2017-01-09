import { BeerClickPage } from './app.po';

describe('beer-click App', function() {
  let page: BeerClickPage;

  beforeEach(() => {
    page = new BeerClickPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
