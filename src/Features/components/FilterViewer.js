import { Chip, makeStyles } from '@material-ui/core';
import { Box } from '@mui/system';
import React, { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    listStyleType: 'none',
    padding: '0 0 0 10px',
    margin: theme.spacing(1, 0),

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao hàng miễn phí',
    isVisible: () => true,
    isActive: (filters) => filters.isFreeShip, // active khi isFreeShip true
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        // Check đang bật thì xóa luôn key
        delete newFilters.isFreeShip;
      } else {
        // Nếu chưa bật thì add vào filters
        newFilters.isFreeShip = true;
      }

      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'Có khuyến mãi',
    isVisible: (filters) => filters.isPromotion,
    // Lấy toàn bộ keys trong filter check có isPromotion thì ẩn đi
    isActive: () => true,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };

      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) =>
      `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_lte') &&
      Object.keys(filters).includes('salePrice_gte') &&
      filters.salePrice_gte > 0 &&
      filters.salePrice_lte > 0,
    isActive: () => true,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };

      delete newFilters.salePrice_lte;
      delete newFilters.salePrice_gte;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 4,
    getLabel: (filters) => `Danh mục: ${filters['category.id']}`,
    isVisible: (filters) => filters['category.id'],
    // Lấy toàn bộ keys trong filter check có isPromotion thì ẩn đi
    isActive: () => true,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };

      delete newFilters['category.id'];
      return newFilters;
    },
    onToggle: () => {},
  },
];

const FilterViewer = ({ filter = {}, onChange = null }) => {
  const classes = useStyles();

  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filter));
  }, [filter]);

  return (
    <div>
      <Box component='ul' className={classes.root}>
        {visibleFilters.map((x) => (
          <li key={x.id}>
            <Chip
              label={x.getLabel(filter)}
              color={x.isActive(filter) ? 'primary' : 'default'}
              clickable={!x.isRemovable}
              size='small'
              onClick={
                x.isRemovable
                  ? null
                  : () => {
                      if (!onChange) return;

                      const newsFilters = x.onToggle(filter);
                      onChange(newsFilters);
                    }
              }
              onDelete={
                x.isRemovable
                  ? () => {
                      if (!onChange) return;

                      const newsFilters = x.onRemove(filter);
                      onChange(newsFilters);
                    }
                  : null
              }
            ></Chip>
          </li>
        ))}
      </Box>
    </div>
  );
};

export default FilterViewer;
