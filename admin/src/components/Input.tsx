import { forwardRef, useState, useCallback, useMemo } from 'react';
import { Field, usePluginTheme } from '@sensinum/strapi-utils';
import { useField } from '@strapi/strapi/admin';

import { Trash, Plus } from '@strapi/icons';
import { Box, Button, Flex, IconButton, TextInput, Typography } from '@strapi/design-system';

import { getMessage } from '../utils';
import type { TableColumn, TableRow } from '../types';


type InputProps = {
  name: string;
  label?: string;
  disabled?: boolean;
};

const Input = forwardRef((props: InputProps) => {
  const { name, label, disabled } = props;
  const field = useField(name);
  const { theme } = usePluginTheme();

  const [columns, setColumns] = useState(field.value?.columns || [{ label: '', type: 'text', required: false }]);
  const [rows, setRows] = useState(field.value?.rows || [Array(1).fill('')]);

  const updateTableValue = useCallback((newColumns: TableColumn[], newRows: TableRow[]) => {
    field.onChange(name, { columns: newColumns, rows: newRows });
  }, [field, name]);

  const updateColumnsState = useCallback((updater: (cols: TableColumn[]) => TableColumn[]) => {
    const updatedColumns = updater(columns);
    setColumns(updatedColumns);
    updateTableValue(updatedColumns, rows);
  }, [columns, rows, updateTableValue]);

  const updateRowsState = useCallback((updater: (rws: TableRow[]) => TableRow[]) => {
    const updatedRows = updater(rows);
    setRows(updatedRows);
    updateTableValue(columns, updatedRows);
  }, [columns, rows, updateTableValue]);

  const addColumn = useCallback(() => {
    const updatedColumns = [...columns, { label: '', type: 'text', required: false }];
    const updatedRows = rows.map((row: TableRow) => [...row, '']);
    setColumns(updatedColumns);
    setRows(updatedRows);
    updateTableValue(updatedColumns, updatedRows);
  }, [columns, rows, updateTableValue]);

  const updateColumn = useCallback((index: number, value: string) => {
    updateColumnsState((cols) => {
      const updated = [...cols];
      updated[index] = { ...cols[index], label: value };
      return updated;
    });
  }, [updateColumnsState]);

  const deleteColumn = useCallback((index: number) => {
    const updatedColumns = columns.filter((_: TableColumn, idx: number) => idx !== index);
    const updatedRows = rows.map((row: TableRow) => row.filter((_: string, cellIdx: number) => cellIdx !== index));
    setColumns(updatedColumns);
    setRows(updatedRows);
    updateTableValue(updatedColumns, updatedRows);
  }, [columns, rows, updateTableValue]);

  const addRow = useCallback(() => {
    updateRowsState((rws) => [...rws, Array(columns.length).fill('')]);
  }, [updateRowsState, columns.length]);

  const deleteRow = useCallback((index: number) => {
    updateRowsState((rws) => rws.filter((_, idx) => idx !== index));
  }, [updateRowsState]);

  const updateCell = useCallback((rowIndex: number, cellIndex: number, value: string) => {
    updateRowsState((rws) => {
      const updated = [...rws];
      updated[rowIndex] = [...rws[rowIndex]];
      updated[rowIndex][cellIndex] = value;
      return updated;
    });
  }, [updateRowsState]);

  const styles = useMemo(() => ({
    columnInput: { paddingRight: '40px' },
    columnButton: { paddingTop: '4px', justifyContent: 'center', alignItems: 'center' },
    columnBorder: { borderBottom: `4px solid ${theme.colors.neutral0}` },
    rowButtonContainer: { minWidth: '32px', justifyContent: 'center', alignItems: 'center' },
    rowBorder: { 
      borderBottom: `4px solid ${theme.colors.neutral0}`, 
      borderTop: `4px solid ${theme.colors.neutral0}` 
    },
    addRowBorder: { border: `4px solid ${theme.colors.neutral0}` },
    horizontalLine: { 
      position: 'absolute' as const, 
      zIndex: -1, 
      right: '15px', 
      left: 0, 
      height: '2px', 
      backgroundColor: theme.colors.neutral100 
    },
    verticalLine: { 
      position: 'absolute' as const, 
      zIndex: -1, 
      right: '15px', 
      bottom: '20px', 
      width: '2px', 
      top: '15px', 
      backgroundColor: theme.colors.neutral100 
    }
  }), [theme.colors.neutral0, theme.colors.neutral100]);

  return (<Box>
    <Flex width="100%" direction="column" gap={2} alignItems="flex-start">
      <Typography fontWeight="bold" variant="pi">{label}</Typography>
      <Flex width="100%" direction="column" gap={4} position="relative" zIndex={0}>
        <Flex width="100%" direction="row" gap={4}>
          {columns.map((column: TableColumn, index: number) => (
            <Flex key={`col_${name}[${index}]`} width="100%" grow={1} direction="row" position="relative">
              <Field name={`${name}[${index}]`}>
                <TextInput
                  id={`${name}[${index}]`}
                  style={styles.columnInput}
                  name={`${name}[${index}]`}
                  value={column.label}
                  disabled={disabled}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateColumn(index, e.target.value)}
                />
              </Field>
              {columns.length > 1 && (
                <IconButton 
                  position="absolute" 
                  right="4px" 
                  top="4px" 
                  onClick={() => deleteColumn(index)} 
                  borderWidth={0}
                >
                  <Trash />
                </IconButton>
              )}
            </Flex>
          ))}
          <Flex width="32px" style={styles.columnButton}>
            <Flex style={styles.columnBorder}>
              <IconButton onClick={addColumn} borderWidth={0} variant="secondary">
                <Plus />
              </IconButton>
            </Flex>
          </Flex>
        </Flex>

        {rows.map((row: TableRow, index: number) => (
          <Flex width="100%" key={`row_${name}[${index}]`} direction="row" gap={4}>
            {columns.map((_: TableColumn, cellIndex: number) => (
              <Flex key={`cell_${name}[${index}][${cellIndex}]`} width="100%" grow={1} direction="row" position="relative">
                <Field name={`${name}[${index}][${cellIndex}]`}>
                  <TextInput
                    id={`${name}[${index}][${cellIndex}]`}
                    name={`${name}[${index}][${cellIndex}]`}
                    value={row[cellIndex]}
                    disabled={disabled}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCell(index, cellIndex, e.target.value)}
                  />
                </Field>
              </Flex>
            ))}
            <Flex style={styles.rowButtonContainer} width="32px">
              {rows.length > 1 && (
                <Flex style={styles.rowBorder}>
                  <IconButton onClick={() => deleteRow(index)} borderWidth={0}>
                    <Trash />
                  </IconButton>
                </Flex>
              )}
            </Flex>
          </Flex>
        ))}
        <Flex width="100%" direction="row" gap={4} justifyContent="center" alignItems="center" position="relative" zIndex={0}>
          <Flex style={styles.addRowBorder}>
            <Button onClick={addRow} variant="secondary" startIcon={<Plus />}>
              {getMessage('controls.addRow')}
            </Button>
          </Flex>
          <div style={styles.horizontalLine} />
        </Flex>
        <div style={styles.verticalLine} />
      </Flex>
    </Flex>
  </Box>);
});

export default Input;
