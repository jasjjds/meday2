'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { FormHead } from '../../../auth/components/form-head';
import { getErrorMessage } from '../../../auth/utils';

export function CreateEmployeeUserNewCreate() {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      Account: '',
      Password: '',
      EmployeeId: '',
      EmployeeUserName: '',
      PhoneNumber: '',
      Email: '',
      Room: '',
      Status: '',
      Unit: '',
      Faculty: '',
      Position: '',
      WorkPosition: ''
    }
  });

  const { handleSubmit, reset, formState: { isSubmitting } } = methods;
  const showPassword = useBoolean();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('Submit data:', data);

      setSuccessMessage('Tạo tài khoản thành công 🎉');

    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  });

  const renderForm = () => (
    <Box sx={{ mt: -3 }}>
      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <Field.Text name="Account" label="Tài khoản" placeholder="abc@gmail.com" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Field.Text
            name="Password"
            label="Mật khẩu"
            type={showPassword.value ? 'text' : 'password'}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showPassword.onToggle} edge="end">
                      <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field.Text name="EmployeeId" label="Mã nhân viên" placeholder="2020xxx" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Field.Text name="EmployeeUserName" label="Tên nhân viên" placeholder="Nguyễn Văn A" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Field.Text name="PhoneNumber" label="Số điện thoại" placeholder="0399xxxxxx" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Field.Text name="Email" label="Email" placeholder="abc@gmail.com" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Field.Text name="Room" label="Phòng làm việc" placeholder="001" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Field.Text name="Status" label="Trạng thái" placeholder="Đang công tác" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Field.Text name="Unit" label="Đơn vị" placeholder="1" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Field.Text name="Faculty" label="Khoa/Viện" placeholder="Khoa ngoại" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="Position"
            control={methods.control}
            defaultValue=""
            render={({ field }) => (
            <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="Position-label">Chức vụ</InputLabel>
            <Select
              {...field}
              labelId="Position-label"
              label="Chức vụ"
            >
              <MenuItem value=""><em>Chọn một</em></MenuItem>
              <MenuItem value="Bác sĩ">Bác sĩ</MenuItem>
              <MenuItem value="Y tá">Y tá</MenuItem>
            </Select>
          </FormControl>
          )}
        />
        </Grid>
        <Grid item xs={12}>
          <Field.Text name="WorkPosition" label="Vị trí công tác" placeholder="Bác sĩ phẫu thuật" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth size="large" type="submit" variant="contained" disabled={isSubmitting}>
            Tạo tài khoản
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Tạo tài khoản nhân viên"
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      {!!successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>
    </>
  );
}
