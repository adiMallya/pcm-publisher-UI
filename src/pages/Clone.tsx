import { Button, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { SiteLayout, BUSelect } from "src/components";
import { CloneEntitySelection } from "src/components/CloneEntitySelection";
import { BUList } from "src/helpers";
import {
  IPublishFormInput,
  IFolderResponse,
  ICampaignResponse,
  ICampaignRequest,
} from "src/helpers/types";
import {
  fetchCampaignsForFolderIdByPage,
  fetchFoldersByBUId,
} from "src/services";
import { theme } from "src/styles";

export const Clone: React.FC = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IPublishFormInput>({
    defaultValues: {
      sourceBU: "",
      targetBU: "",
      sourceCampaignID: "",
      publishedCampaignName: "",
      targetCampaignId: "",
      targetFolder: "",
    },
  });

  const onSubmit: SubmitHandler<IPublishFormInput> = (data) =>
    console.log(data);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const folders = await fetchFoldersByBUId(
  //         "53F8CDC5-F8C9-4F2B-A7DD-75B24DD12773"
  //       );
  //       console.log("Folders: ", folders);

  //       // Assuming you want to fetch campaigns for the first folder as an example
  //       if (folders && folders.length > 0) {
  //         const firstFolderId = folders[0].folderID;
  //         const campaigns = await fetchCampaignsForFolderIdByPage({
  //           folderID: firstFolderId,
  //           pageNo: 0,
  //           recordsPerPage: 10,
  //         });
  //         console.log("Campaigns: ", campaigns);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <SiteLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Toolbar
          sx={{
            backgroundColor: (theme) => theme.palette.primary.light,
            display: "flex",
            justifyContent: "space-around",
            padding: theme.spacing(2),
          }}
        >
          <Controller
            name="sourceBU"
            control={control}
            rules={{ required: "Source BU not selected" }}
            render={({ field, fieldState }) => (
              <BUSelect
                label="Select Source BU"
                value={field.value}
                onChange={field.onChange}
                options={BUList}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ""}
              />
            )}
          />
          <Controller
            name="targetBU"
            control={control}
            rules={{ required: "Target BU not selected" }}
            render={({ field, fieldState }) => (
              <BUSelect
                label="Select Target BU"
                value={field.value}
                onChange={field.onChange}
                options={BUList}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ""}
              />
            )}
          />
        </Toolbar>
        {/* Here */}
        <CloneEntitySelection
          title=""
          width="100%"
          height="auto"
          buId={watch("sourceBU")}
          onSelectedCampaignChange={(campaignID) =>
            setValue("sourceCampaignID", campaignID)
          }
        />
        <Button type="submit">Publish</Button>
      </form>
    </SiteLayout>
  );
};
