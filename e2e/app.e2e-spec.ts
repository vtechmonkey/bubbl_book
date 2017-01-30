import { BubblbookPage } from './app.po';

describe('bubblbook App', function() {
  let page: BubblbookPage;

  beforeEach(() => {
    page = new BubblbookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
