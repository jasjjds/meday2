
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { Add as AddIcon } from "@mui/icons-material";
import { usePopover } from 'minimal-shared/hooks';
import { TableHeadCustom } from 'src/components/table';
import { CustomPopover } from 'src/components/custom-popover';

// -------------------------------------------------------------

export function EmployeeUserList_NewList({
  title,
  subheader,
  tableData,
  headCells,
  onDeleteRow,           // 👈 nhận callback từ cha
  sx,
  ...other
}) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <Scrollbar sx={{ minHeight: 402 }}>
        <Table sx={{ minWidth: 680 }}>
          <TableHeadCustom headCells={headCells} />

          <TableBody>
            {tableData.map((row) => (
              <RowItem key={row.id} row={row} onDeleteRow={onDeleteRow} />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'right' }}>
        <Button size="small" color="inherit" href={paths.dashboard.general.CreateEmployeeUser}>
          Tạo tài khoản mới
        </Button>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          Xem toàn bộ
        </Button>
      </Box> */}

<Box sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'right', gap: 2, padding: 2 }}>
        
        <Button
        size="small"
        variant="contained" // đổi từ "inherit" sang "contained" cho nổi
        color="primary"
        startIcon={<AddIcon />}
        href={paths.dashboard.general.CreateEmployeeUser}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          boxShadow: 2,
          fontWeight: "bold",
          px: 2,
          py: 1.5, // tăng chiều cao
      minHeight: 48, // ép chiều cao tối thiểu
      
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: 4,
            transform: "scale(1.03)"
          }
        }}
      >
        Tạo tài khoản mới
      </Button>

        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          Xem toàn bộ
        </Button>
      </Box>

    </Card>
  );
}

// -------------------------------------------------------------

function RowItem({ row, onDeleteRow }) {
  const menuActions = usePopover();

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem onClick={menuActions.onClose}>
          <Iconify icon="solar:share-bold" />
          Chỉnh sửa
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            menuActions.onClose();
            onDeleteRow?.(row.id, row.fullname);
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Xóa
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <TableRow>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.username}</TableCell>
        <TableCell>{row.fullname}</TableCell>
        <TableCell>{row.role}</TableCell>
        <TableCell>{row.createdAt}</TableCell>

        <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton color={menuActions.open ? 'inherit' : 'default'} onClick={menuActions.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {renderMenuActions()}
    </>
  );
}
