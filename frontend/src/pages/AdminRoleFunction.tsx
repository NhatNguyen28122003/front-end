import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

interface Role {
  id: number;
  name: string;
  description: string;
}

interface FunctionItem {
  code: string;
  name: string;
  description: string;
}

interface User {
  id: number;
  userName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export default function AdminRoleFunction() {
  const [tab, setTab] = useState(0);

  // Role state
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [roleForm, setRoleForm] = useState<Partial<Role & { code: string }>>({});
  const [roleEditId, setRoleEditId] = useState<number | null>(null);

  // Function state
  const [functions, setFunctions] = useState<FunctionItem[]>([]);
  const [functionDialogOpen, setFunctionDialogOpen] = useState(false);
  const [functionForm, setFunctionForm] = useState<Partial<FunctionItem>>({});
  const [functionEditCode, setFunctionEditCode] = useState<string | null>(null);

  // User state
  const [users, setUsers] = useState<User[]>([]);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [userForm, setUserForm] = useState<Partial<User>>({});
  const [userEditId, setUserEditId] = useState<number | null>(null);

  // Snackbar
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  // Fetch roles
  const fetchRoles = async () => {
    const res = await fetch('http://localhost:8080/api/v1/library/role/getAllRole');
    const data = await res.json();
    setRoles(data);
  };

  // Fetch functions
  const fetchFunctions = async () => {
    const res = await fetch('http://localhost:8080/api/v1/library/function/getAllFunction');
    const data = await res.json();
    setFunctions(data);
  };

  // Fetch users
  const fetchUsers = async () => {
    const res = await fetch('http://localhost:8080/api/v1/library/user/getAll');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchRoles();
    fetchFunctions();
    fetchUsers();
  }, []);

  // Role handlers
  const handleRoleDialogOpen = (role?: Role) => {
    if (role) {
      setRoleForm({ ...role });
      setRoleEditId(role.id);
    } else {
      setRoleForm({});
      setRoleEditId(null);
    }
    setRoleDialogOpen(true);
  };
  const handleRoleDialogClose = () => setRoleDialogOpen(false);
  const handleRoleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleForm({ ...roleForm, [e.target.name]: e.target.value });
  };
  const handleRoleSubmit = async () => {
    try {
      if (roleEditId) {
        // Update role
        await fetch(`http://localhost:8080/api/v1/library/role/update/${roleEditId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(roleForm),
        });
        setSnackbar({ open: true, message: 'Cập nhật role thành công', severity: 'success' });
      } else {
        // Create role
        await fetch('http://localhost:8080/api/v1/library/role/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(roleForm),
        });
        setSnackbar({ open: true, message: 'Thêm role thành công', severity: 'success' });
      }
      fetchRoles();
      setRoleDialogOpen(false);
    } catch {
      setSnackbar({ open: true, message: 'Có lỗi xảy ra', severity: 'error' });
    }
  };
  const handleRoleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa role này?')) return;
    try {
      await fetch(`http://localhost:8080/api/v1/library/role/delete/${id}`, { method: 'DELETE' });
      setSnackbar({ open: true, message: 'Xóa role thành công', severity: 'success' });
      fetchRoles();
    } catch {
      setSnackbar({ open: true, message: 'Có lỗi xảy ra', severity: 'error' });
    }
  };

  // Function handlers
  const handleFunctionDialogOpen = (func?: FunctionItem) => {
    if (func) {
      setFunctionForm({ ...func });
      setFunctionEditCode(func.code);
    } else {
      setFunctionForm({});
      setFunctionEditCode(null);
    }
    setFunctionDialogOpen(true);
  };
  const handleFunctionDialogClose = () => setFunctionDialogOpen(false);
  const handleFunctionFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFunctionForm({ ...functionForm, [e.target.name]: e.target.value });
  };
  const handleFunctionSubmit = async () => {
    try {
      if (functionEditCode) {
        // Update function
        await fetch(`http://localhost:8080/api/v1/library/function/update/${functionEditCode}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(functionForm),
        });
        setSnackbar({ open: true, message: 'Cập nhật function thành công', severity: 'success' });
      } else {
        // Create function
        await fetch('http://localhost:8080/api/v1/library/function/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(functionForm),
        });
        setSnackbar({ open: true, message: 'Thêm function thành công', severity: 'success' });
      }
      fetchFunctions();
      setFunctionDialogOpen(false);
    } catch {
      setSnackbar({ open: true, message: 'Có lỗi xảy ra', severity: 'error' });
    }
  };
  const handleFunctionDelete = async (code: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa function này?')) return;
    try {
      await fetch(`http://localhost:8080/api/v1/library/function/delete/${code}`, { method: 'DELETE' });
      setSnackbar({ open: true, message: 'Xóa function thành công', severity: 'success' });
      fetchFunctions();
    } catch {
      setSnackbar({ open: true, message: 'Có lỗi xảy ra', severity: 'error' });
    }
  };

  // User handlers
  const handleUserDialogOpen = (user?: User) => {
    if (user) {
      setUserForm({ ...user });
      setUserEditId(user.id);
    } else {
      setUserForm({});
      setUserEditId(null);
    }
    setUserDialogOpen(true);
  };
  const handleUserDialogClose = () => setUserDialogOpen(false);
  const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const handleUserSubmit = async () => {
    try {
      if (userEditId) {
        // Update user
        await fetch(`http://localhost:8080/api/v1/library/user/update/${userEditId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userForm),
        });
        setSnackbar({ open: true, message: 'Cập nhật người dùng thành công', severity: 'success' });
      } else {
        // Create user
        await fetch('http://localhost:8080/api/v1/library/user/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userForm),
        });
        setSnackbar({ open: true, message: 'Thêm người dùng thành công', severity: 'success' });
      }
      fetchUsers();
      setUserDialogOpen(false);
    } catch {
      setSnackbar({ open: true, message: 'Có lỗi xảy ra', severity: 'error' });
    }
  };
  const handleUserDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa người dùng này?')) return;
    try {
      await fetch(`http://localhost:8080/api/v1/library/user/delete/${id}`, { method: 'DELETE' });
      setSnackbar({ open: true, message: 'Xóa người dùng thành công', severity: 'success' });
      fetchUsers();
    } catch {
      setSnackbar({ open: true, message: 'Có lỗi xảy ra', severity: 'error' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Quản trị Role, Function & User</Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Quản lý Role" />
        <Tab label="Quản lý Function" />
        <Tab label="Quản lý Người dùng" />
      </Tabs>
      {tab === 0 && (
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button variant="contained" onClick={() => handleRoleDialogOpen()}>Thêm Role</Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>{role.id}</TableCell>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRoleDialogOpen(role)}><Edit /></IconButton>
                      <IconButton onClick={() => handleRoleDelete(role.id)}><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      {tab === 1 && (
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button variant="contained" onClick={() => handleFunctionDialogOpen()}>Thêm Function</Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {functions.map((func) => (
                  <TableRow key={func.code}>
                    <TableCell>{func.code}</TableCell>
                    <TableCell>{func.name}</TableCell>
                    <TableCell>{func.description}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleFunctionDialogOpen(func)}><Edit /></IconButton>
                      <IconButton onClick={() => handleFunctionDelete(func.code)}><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      {tab === 2 && (
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button variant="contained" onClick={() => handleUserDialogOpen()}>Thêm Người dùng</Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên đăng nhập</TableCell>
                  <TableCell>Họ tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Địa chỉ</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleUserDialogOpen(user)}><Edit /></IconButton>
                      <IconButton onClick={() => handleUserDelete(user.id)}><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      {/* Role Dialog */}
      <Dialog open={roleDialogOpen} onClose={handleRoleDialogClose}>
        <DialogTitle>{roleEditId ? 'Sửa Role' : 'Thêm Role'}</DialogTitle>
        <DialogContent sx={{ minWidth: 350 }}>
          <TextField
            margin="normal"
            label="Code"
            name="code"
            fullWidth
            value={roleForm.code || ''}
            onChange={handleRoleFormChange}
            disabled={!!roleEditId}
          />
          <TextField
            margin="normal"
            label="Tên"
            name="name"
            fullWidth
            value={roleForm.name || ''}
            onChange={handleRoleFormChange}
          />
          <TextField
            margin="normal"
            label="Mô tả"
            name="description"
            fullWidth
            value={roleForm.description || ''}
            onChange={handleRoleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRoleDialogClose}>Hủy</Button>
          <Button onClick={handleRoleSubmit} variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
      {/* Function Dialog */}
      <Dialog open={functionDialogOpen} onClose={handleFunctionDialogClose}>
        <DialogTitle>{functionEditCode ? 'Sửa Function' : 'Thêm Function'}</DialogTitle>
        <DialogContent sx={{ minWidth: 350 }}>
          <TextField
            margin="normal"
            label="Code"
            name="code"
            fullWidth
            value={functionForm.code || ''}
            onChange={handleFunctionFormChange}
            disabled={!!functionEditCode}
          />
          <TextField
            margin="normal"
            label="Tên"
            name="name"
            fullWidth
            value={functionForm.name || ''}
            onChange={handleFunctionFormChange}
          />
          <TextField
            margin="normal"
            label="Mô tả"
            name="description"
            fullWidth
            value={functionForm.description || ''}
            onChange={handleFunctionFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFunctionDialogClose}>Hủy</Button>
          <Button onClick={handleFunctionSubmit} variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
      {/* User Dialog */}
      <Dialog open={userDialogOpen} onClose={handleUserDialogClose}>
        <DialogTitle>{userEditId ? 'Sửa Người dùng' : 'Thêm Người dùng'}</DialogTitle>
        <DialogContent sx={{ minWidth: 350 }}>
          <TextField
            margin="normal"
            label="Tên đăng nhập"
            name="userName"
            fullWidth
            value={userForm.userName || ''}
            onChange={handleUserFormChange}
            disabled={!!userEditId}
          />
          <TextField
            margin="normal"
            label="Họ tên"
            name="fullName"
            fullWidth
            value={userForm.fullName || ''}
            onChange={handleUserFormChange}
          />
          <TextField
            margin="normal"
            label="Email"
            name="email"
            fullWidth
            value={userForm.email || ''}
            onChange={handleUserFormChange}
          />
          <TextField
            margin="normal"
            label="Số điện thoại"
            name="phoneNumber"
            fullWidth
            value={userForm.phoneNumber || ''}
            onChange={handleUserFormChange}
          />
          <TextField
            margin="normal"
            label="Địa chỉ"
            name="address"
            fullWidth
            value={userForm.address || ''}
            onChange={handleUserFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUserDialogClose}>Hủy</Button>
          <Button onClick={handleUserSubmit} variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
} 