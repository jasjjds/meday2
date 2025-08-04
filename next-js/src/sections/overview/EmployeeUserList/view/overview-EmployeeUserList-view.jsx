'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';
import { _EmployeeUser } from 'src/_mock';

import { svgColorClasses } from 'src/components/svg-color';

import { useMockedUser } from 'src/auth/hooks';

import { EmployeeUserList_NewList }  from '../EmployyeeUserList-new-list';


// ----------------------------------------------------------------------
export function EmployeeUserList() {
  const { user } = useMockedUser();

  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <EmployeeUserList_NewList
            title="Danh sách nhân viên"
            tableData={_EmployeeUser}
            headCells={[
              { id: 'Id', label: 'ID người dùng' },
              { id: 'EmployeeUserId', label: 'Mã nhân viên' },
              { id: 'Name', label: 'Tên nhân viên' },
              { id: 'Account', label: 'Tài khoản' },
              { id: 'Password', label: 'Mật khẩu' },
              { id: 'PhoneNumber', label: 'Số điện thoại' },
              { id: 'Email', label: 'Email' },
              { id: 'Room', label: 'Phòng' },
              { id: 'Status', label: 'Trạng thái nhân viên' },
              { id: 'Unit', label: 'Đơn vị trực thuộc' },
              { id: 'Faculty', label: 'Khoa/ viện' },
              { id: 'Position', label: 'Chức vụ' },
              { id: 'WorkPosition', label: 'Vị trí công tác' },
              { id: '', label: '' },
            ]}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
