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
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { FormHead } from '../../../auth/components/form-head';
import { getErrorMessage } from '../../../auth/utils';

export function CreateEmployeeUserNewCreate() {
  // 1. Khởi tạo form
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

  // 2. Hàm submit giữ trên trang hiện tại
  const onSubmit = handleSubmit(async (data) => {
    try {
      // TODO: gọi API tạo tài khoản
      console.log('Submit data:', data);

      // Hiện thông báo thành công
      setSuccessMessage('Tạo tài khoản thành công 🎉');

      // Nếu muốn reset form, bỏ comment dòng này
      // reset();
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  });

  // 3. Form layout với 2 cột
  const renderForm = () => (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Field.Text name="Account" label="Tài khoản" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <Field.Text name="EmployeeId" label="Mã nhân viên" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field.Text name="EmployeeUserName" label="Tên nhân viên" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field.Text name="PhoneNumber" label="Số điện thoại" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field.Text name="Email" label="Email" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field.Text name="Room" label="Phòng làm việc" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field.Text name="Status" label="Trạng thái" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field.Text name="Unit" label="Đơn vị" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field.Text name="Faculty" label="Khoa/Viện" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field.Text name="Position" label="Chức vụ" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field.Text name="WorkPosition" label="Vị trí công tác" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
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
        description={
          <>
            Không có tài khoản ư?{' '}
            <Link
              component={RouterLink}
              href={paths.auth.jwt.signUp}
              variant="subtitle2"
            >
              Đăng ký ngay
            </Link>
          </>
        }
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
