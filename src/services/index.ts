import axios from "axios";
import {
  BASE_API,
  ICampaignRequest,
  IPublishCloneRequest,
  IPublishFormInput,
  ISearchCampaignRequest,
} from "src/helpers";

export const fetchFoldersByBUId = async (buId: string) => {
  try {
    const response = await axios.get(`${BASE_API}/folders/${buId}`);
    if (response.status !== 200)
      throw new Error(
        `Failed to fetch folders, server responded with status: ${response.status}`
      );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchCampaignsForFolderIdByPage = async (
  reqBody: ICampaignRequest
) => {
  try {
    const response = await axios.post(
      `${BASE_API}/campaigns/${reqBody.folderID}`,
      {
        ...reqBody,
      }
    );
    if (response.status !== 200)
      throw new Error(
        `Failed to fetch campaigns for folder: ${reqBody.folderID}, server responded with status: ${response.status}`
      );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const searchCampaignsByName = async ({
  searchName,
  ...rest
}: ISearchCampaignRequest) => {
  try {
    const response = await axios.post(`${BASE_API}/campaigns`, {
      campaignName: searchName,
      campaignType: 0,
      ...rest,
    });
    if (response.status !== 200)
      throw new Error(
        `Failed to fetch campaigns, server responded with status: ${response.status}`
      );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const publishToClone = async ({
  targetCampaignID : receivedID,
  ...rest
}: IPublishCloneRequest) => {
  try {
    const response = await axios.post(`${BASE_API}/publish/clone`, {
      targetCampaignID: receivedID === '' && null,
      ...rest      
    });
    if (response.status !== 200)
      throw new Error(
        `Failed to publish, server responded with status: ${response.status}`
      );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};