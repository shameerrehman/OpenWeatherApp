import { Switch, FormControlLabel } from '@mui/material';

export default function UnitToggle({ isMetric, onToggle }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">°C</span>
      <FormControlLabel
        control={
          <Switch
            checked={!isMetric}
            onChange={onToggle}
            color="primary"
          />
        }
        label=""
      />
      <span className="text-sm">°F</span>
    </div>
  );
} 