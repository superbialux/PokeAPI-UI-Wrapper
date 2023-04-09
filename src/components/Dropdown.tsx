import React, { Key } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps as MuiSelectProps,
  MenuItemProps,
  FormControlProps,
} from '@mui/material';

type DropdownProps<T> = MuiSelectProps<T> & {
  items: (MenuItemProps & { name: string })[];
  formControlProps?: FormControlProps;
};

const Dropdown = <T extends unknown>({
  items,
  formControlProps,
  label,
  ...props
}: DropdownProps<T>) => (
  <FormControl {...formControlProps}>
    <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
    <Select {...props}>
      {items.map((item) => (
        <MenuItem key={item.value as Key} value={item.value}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default Dropdown;
