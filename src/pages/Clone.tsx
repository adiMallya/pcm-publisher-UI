import { Button, Toolbar, Stack, TextField } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SiteLayout, BUSelect } from "src/components";
import { CloneEntitySelection } from "src/components/CloneEntitySelection";
import { BUList } from "src/helpers";
import { IPublishFormInput } from "src/helpers/types";
import { publishToClone } from "src/services";
import { theme } from "src/styles";

export const Clone: React.FC = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isLoading },
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
    mode: "onChange",
  });

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IPublishFormInput> = async (data) => {
    const res = await publishToClone({
      sourceBUID: data.sourceBU,
      targetBUID: data.targetBU,
      sourceCampaignID: data.sourceCampaignID,
      targetFolderID: data.targetFolder,
      targetCampaignName: data.publishedCampaignName,
      targetCampaignID: data.targetCampaignId,
    });
    if (res?.traceID) {
      console.log(res.traceID);
      toast.success("Publish Job Create. You will be notified.");
      console.log(data);
      setTimeout(() => {
        navigate("/");
        return;
      }, 2000);
    } else {
      console.log(res);
      console.log(data);
      toast.error("Something went wrong.");
    }
  };

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
        <Stack direction={"row"} width={"100%"} justifyContent={"space-around"}>
          <CloneEntitySelection
            title="Source BU"
            buId={watch("sourceBU")}
            onSelectedCampaignChange={(campaignID) =>
              setValue("sourceCampaignID", campaignID)
            }
          />
          <CloneEntitySelection
            title="Target BU"
            buId={watch("targetBU")}
            onSelectedCampaignChange={(campaignID) =>
              setValue("targetCampaignId", campaignID)
            }
            onSelectedFolderChange={(folderID) =>
              setValue("targetFolder", folderID)
            }
          />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          width={"100%"}
          sx={{ padding: theme.spacing(2) }}
        >
          <Controller
            name="publishedCampaignName"
            control={control}
            rules={{ required: "Publish name is required" }}
            render={({ field, fieldState }) => (
              <TextField
                label="Publish Name (in Target Folder)"
                variant="outlined"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ""}
                {...field}
                sx={{
                  "& .MuiInputLabel-outlined": {
                    color: "text.primary",
                  },
                }}
              />
            )}
          />
          <Button
            type="submit"
            disabled={!isValid}
            fullWidth
            endIcon={isLoading && <LoopIcon />}
          >
            Publish
          </Button>
        </Stack>
      </form>
    </SiteLayout>
  );
};
