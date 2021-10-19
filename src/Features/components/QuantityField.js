import { IconButton, OutlinedInput } from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/system';
import React from 'react';
import { Controller } from 'react-hook-form';

const QuantityField = (props) => {
  const { form, name, disabled } = props;
  const { errors, setValue } = form;
  const hasError = !!errors[name];
  return (
    <FormControl
      error={hasError}
      fullWidth
      margin='normal'
      variant='standard'
      size='small'
    >
      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value, name }) => (
          <Box>
            <IconButton
              onClick={() => setValue(name, Number.parseInt(value) - 1)}
            >
              <RemoveCircleOutline />
            </IconButton>
            <OutlinedInput
              id={name}
              type='number'
              disabled={disabled}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
            <IconButton
              onClick={() => setValue(name, Number.parseInt(value) + 1)}
            >
              <AddCircleOutline />
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
};

export default QuantityField;
