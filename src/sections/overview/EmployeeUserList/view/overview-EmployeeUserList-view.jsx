'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';

import { DashboardContent } from 'src/layouts/dashboard';
import axiosInstance, { endpoints } from 'src/lib/axios';
import { useMockedUser } from 'src/auth/hooks';
import { EmployeeUserList_NewList } from '../EmployyeeUserList-new-list';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function EmployeeUserList() {
  const { user } = useMockedUser();
  const theme = useTheme();

  const [idInput, setIdInput] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [page] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');     // 👈 thông báo thành công
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);

  const runSearch = () => {
    const val = idInput.trim();
    if (val === '') { setErr(''); setSelectedId(null); return; }
    if (!/^\d+$/.test(val)) { setErr('ID phải là số'); return; }
    setErr(''); setSelectedId(Number(val));
  };
  const onKeyDown = (e) => { if (e.key === 'Enter') runSearch(); };

  // 👉 Handler XÓA: gọi API và cập nhật bảng
  const handleDeleteRow = async (id, fullname) => {
    const ok = window.confirm(`Bạn chắc chắn muốn xóa nhân viên ${fullname}?`);
    if (!ok) return;

    setLoading(true);
    setErr('');
    setSuccess('');
    try {
      const url =
        (endpoints.staff.deleteId || endpoints.staff.deleteID).replace('{id}', String(id));
      await axiosInstance.delete(url);               // DELETE /staffs/{id}

      // cập nhật UI
      setTableData((prev) => prev.filter((r) => r.id !== id));
      setTotal((prev) => Math.max(0, prev - 1));
      if (selectedId === id) setSelectedId(null);

      setSuccess(`Đã xóa nhân viên ID ${name} thành công ✅`);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || 'Xóa nhân viên thất bại');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      setErr((prev) => (prev === 'ID phải là số' ? prev : ''));
      setSuccess('');
      try {
        if (selectedId !== null) {
          const url = endpoints.staff.getID.replace('{id}', String(selectedId));
          const res = await axiosInstance.get(url);
          const s = (res && res.data && (res.data.data ?? res.data)) || null;

          const minimal = s
            ? [{
                id: s.id,
                username: s.username,
                fullname: s.fullname,
                role: s.role === 1 ? 'Bác sĩ' : s.role === 2 ? 'Y tá' : '-',
                createdAt: s.createdAt,
              }]
            : [];
          if (!ignore) { setTableData(minimal); setTotal(minimal.length); }
        } else {
          const res = await axiosInstance.get(endpoints.staff.fillter, { params: { page, limit } });
          const list = Array.isArray(res?.data?.data) ? res.data.data : [];
          const minimal = list.map((s) => ({
            id: s.id,
            username: s.username,
            fullname: s.fullname,
            role: s.role === 1 ? 'Bác sĩ' : s.role === 2 ? 'Y tá' : '-',
            createdAt: s.createdAt,
          })).sort((a, b) => Number(a.id) - Number(b.id));

          if (!ignore) { setTableData(minimal); setTotal(res?.data?.total ?? minimal.length); }
        }
      } catch (e) {
        if (!ignore) {
          if (e?.response?.status === 404 && selectedId !== null) {
            setTableData([]); setTotal(0);
            setErr(`Không tìm thấy nhân viên với ID ${selectedId}`);
          } else {
            setErr(e?.response?.data?.message || e.message || 'Load staff failed');
          }
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [page, limit, selectedId]);

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h5">Danh sách nhân viên</Typography>
        </Grid>

        <Grid item>
          <TextField
            fullWidth
            label="Tìm theo ID"
            placeholder="Nhập ID, ví dụ 12"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            onKeyDown={onKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={runSearch} edge="end" aria-label="search-by-id">
                    <Iconify icon="solar:magnifer-bold" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {loading && (
          <Grid item>
            <CircularProgress size={24} />
          </Grid>
        )}

        {err && (
          <Grid item>
            <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>
          </Grid>
        )}

        {success && (
          <Grid item>
            <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
          </Grid>
        )}

        <Grid item>
          <EmployeeUserList_NewList
            title={`Danh sách nhân viên (Tổng: ${total})`}
            tableData={tableData}
            headCells={[
              { id: 'id', label: 'ID' },
              { id: 'username', label: 'Tài khoản' },
              { id: 'fullname', label: 'Họ & Tên' },
              { id: 'role', label: 'Chức vụ' },
              { id: 'createdAt', label: 'Ngày tạo' },
              { id: '', label: '' },
            ]}
            onDeleteRow={handleDeleteRow}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}