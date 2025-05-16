import { useState } from 'react';
import {
  Box, Paper, Typography, TextField, Button, FormControlLabel, Checkbox, Link
} from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý đăng nhập
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('/src/assets/loginRegister.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 400,
          borderRadius: 3,
          boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
          bgcolor: 'rgba(255,255,255,0.97)',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Email address</Typography>
          <TextField
            placeholder="Email"
            variant="outlined"
            margin="dense"
            fullWidth
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Password</Typography>
          <TextField
            placeholder="Password"
            variant="outlined"
            margin="dense"
            fullWidth
            required
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{ mb: 1.5 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} />}
              label="Remember Me"
              sx={{ m: 0 }}
            />
            <Link href="#" variant="body2">Forgot Password?</Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              mb: 2,
              bgcolor: '#43d17a',
              color: 'white',
              fontWeight: 600,
              fontSize: 18,
              boxShadow: '0 2px 8px 0 rgba(67,209,122,0.15)'
            }}
          >
            Login
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link href="/register" variant="body2" sx={{ fontSize: 17 }}>
              Create new account
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
} 