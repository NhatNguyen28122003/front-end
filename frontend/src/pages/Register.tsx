import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Thực hiện đăng ký với API mới
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
      <Paper elevation={3} sx={{ p: 4, width: 350, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.97)' }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>Register</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email address"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#43d17a', color: 'white', fontWeight: 600, fontSize: 18 }}
          >
            Register
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link href="/login" variant="body2" sx={{ fontSize: 17 }}>
              Already have an account? Login
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
} 