'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';
import { _PatientUser } from 'src/_mock';

import { svgColorClasses } from 'src/components/svg-color';

import { useMockedUser } from 'src/auth/hooks';

import { PatientUserList_NewList }  from '../PatientUserList-new-list';


// ----------------------------------------------------------------------
export function PatientUserList() {
  const { user } = useMockedUser();

  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <PatientUserList_NewList
            title="Danh sách bệnh nhân"
            tableData={_PatientUser}
            headCells={[
              { id: 'Id', label: 'ID người dùng' },
              { id: 'PatientUserId', label: 'Mã bệnh nhân' },
              { id: 'Name', label: 'Tên bệnh nhân' },
              { id: 'Account', label: 'Tài khoản' },
              { id: 'Password', label: 'Mật khẩu' },
              { id: 'PhoneNumber', label: 'Số điện thoại' },
              { id: 'Email', label: 'Email' },
              { id: 'Date', label: 'Ngày sinh' },
              { id: 'Sex', label: 'Giới tính' },
              { id: 'Nationality', label: 'Quốc tịch' },
              { id: 'Nation', label: 'Dân tộc' },
              { id: 'Address', label: 'Địa chỉ' },
              { id: 'Work', label: 'Nghề nghiệp' },
              { id: '', label: '' },
            ]}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
