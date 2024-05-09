export interface IBu {
  buId: string;
  buName: string;
}

export interface IPublishFormInput {
  sourceBU: string;
  targetBU: string;
  sourceCampaignID: string;
  publishedCampaignName: string;
  targetFolder: string;
  targetCampaignId: string;
}
// Folders
export interface IFolderResponse {
  folderID: string;
  folderName: string;
}
// Campaigns
export interface ICampaignRequest {
  folderID: string;
  pageNo: Number;
  recordsPerPage: number;
}
export interface Campaign {
  campaignID: string;
  campaignName: string;
}
export interface ICampaignResponse {
  campaigns: Campaign[];
  totalRecords: Number;
}
// Search Campaigns
export interface ISearchCampaignRequest {
  folderID: string;
  pageNo: Number;
  recordsPerPage: number;
  searchName: string;
}
// PUBLISH
export interface IPublishCloneRequest {
  sourceBUID: string;
  targetBUID: string;
  sourceCampaignID: string;
  targetCampaignName: string;
  targetFolderID: string;
  targetCampaignID: string | null;
}
