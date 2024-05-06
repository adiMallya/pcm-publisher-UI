export interface IBu {
  buId: string;
  buName: string;
}

export interface IPublishFormInput {
  sourceBU: string;
  targetBU: string;
  sourceCampaignID: string;
  publishedCampaignName?: string;
  targetFolder?: string;
  targetCampaignId?: string;
}
