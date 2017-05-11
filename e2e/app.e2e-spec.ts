import { CampaignTrackerPage } from './app.po';

describe('campaign-tracker App', () => {
  let page: CampaignTrackerPage;

  beforeEach(() => {
    page = new CampaignTrackerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
