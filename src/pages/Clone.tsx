import { Button, Toolbar } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { SiteLayout, BUSelect } from "src/components";
import { BUList } from "src/helpers";
import { IPublishFormInput } from "src/helpers/types";
import { theme } from "src/styles";

export const Clone: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
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
        <Button type="submit">Publish</Button>
      </form>
    </SiteLayout>
  );
};
