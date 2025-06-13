import { Switch, FormControlLabel } from '@mui/material';

// UnitToggle component allows users to switch between metric and imperial units
export default function UnitToggle({ isMetric, onToggle }) {
  return (
    // Toggle UI with labels for Celsius and Fahrenheit
    <div className="flex items-center gap-2">
      {/* Celsius label */}
      <span className="text-sm">°C</span>
      {/* Material UI Switch for toggling units */}
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
      {/* Fahrenheit label */}
      <span className="text-sm">°F</span>
    </div>
  );
} 