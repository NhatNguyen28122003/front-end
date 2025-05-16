import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab
} from '@mui/material';
import {
  Person as PersonIcon,
  Book as BookIcon,
  History as HistoryIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import BookManager from '../components/admin/BookManager';
import CategoryManager from '../components/admin/CategoryManager';
import CommentManager from '../components/admin/CommentManager';
import PostManager from '../components/admin/PostManager';
import RoleManager from '../components/admin/RoleManager';
import UserManager from '../components/admin/UserManager';

const tabComponents = [
  { label: 'Books', component: <BookManager /> },
  { label: 'Categories', component: <CategoryManager /> },
  { label: 'Comments', component: <CommentManager /> },
  { label: 'Posts', component: <PostManager /> },
  { label: 'Roles', component: <RoleManager /> },
  { label: 'Users', component: <UserManager /> },
];

export default function Account() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [tab, setTab] = useState(0);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log('Update profile:', { name, email });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Tài khoản của tôi</Typography>
            </Box>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary="Sách của tôi" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Lịch sử đọc" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Cài đặt" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Thông tin cá nhân
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box component="form" onSubmit={handleUpdateProfile}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Cập nhật thông tin
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Đổi mật khẩu
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Mật khẩu hiện tại"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Mật khẩu mới"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Xác nhận mật khẩu mới"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                  >
                    Đổi mật khẩu
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          {tabComponents.map((t, i) => (
            <Tab key={i} label={t.label} />
          ))}
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {tabComponents[tab].component}
        </Box>
      </Box>
    </Container>
  );
} 