import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import QuantityField from './QuantityField';

const AddToCart = ({ onSubmit = null }) => {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Please enter at least 1')
      .typeError('Please enter a number'),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name='quantity' label='Quantity' form={form} />

      <Button type='submit' variant='contained' color='primary' fullWidth>
        Buy
      </Button>
    </form>
  );
};

export default AddToCart;
