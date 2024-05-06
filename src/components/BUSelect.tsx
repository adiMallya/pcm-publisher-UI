import { FormControl, InputLabel } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IBu } from "src/helpers";

interface BUSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: IBu[];
  error?: boolean;
  helperText?: string;
}

export const BUSelect: React.FC<BUSelectProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  helperText,
}) => {
  return (
    <FormControl error={error} fullWidth>
      <InputLabel sx={{ color: "text.primary" }}>{label}</InputLabel>
      <Select
        label={`${label}*`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        sx={{
          color: "text.primary",
          "& .MuiSelect-select": {
            color: "text.primary",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.light",
          },
        }}
      >
        {options.map(({ buId, buName }) => (
          <MenuItem key={buId} value={buId} sx={{ color: "text.primary" }}>
            {buName}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
