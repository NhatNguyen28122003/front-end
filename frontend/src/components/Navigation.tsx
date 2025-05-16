import { Box, Typography, Button, IconButton } from '@mui/material';
import { Favorite, ShoppingCart, Chat, Work } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'white',
        px: 4,
        py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
      }}
    >
      {/* Logo */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 500, color: '#42516e', letterSpacing: 0.5 }}
        component={RouterLink}
        to="/"
        style={{ textDecoration: 'none' }}
      >
        Bookztron
      </Typography>
      {/* Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#c97b8a',
            color: 'white',
            fontWeight: 500,
            fontSize: 16,
            px: 4,
            borderRadius: 1.5,
            boxShadow: 'none',
            mr: 2,
            '&:hover': { bgcolor: '#b86a7a' },
          }}
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
        <IconButton sx={{ bgcolor: '#31708e', color: 'white', mx: 0.5, '&:hover': { bgcolor: '#22506a' } }}>
          <Chat />
        </IconButton>
        <IconButton sx={{ bgcolor: '#31708e', color: 'white', mx: 0.5, '&:hover': { bgcolor: '#22506a' } }}>
          <Favorite />
        </IconButton>
        <IconButton sx={{ bgcolor: '#31708e', color: 'white', mx: 0.5, '&:hover': { bgcolor: '#22506a' } }}>
          <ShoppingCart />
        </IconButton>
        <IconButton sx={{ bgcolor: '#31708e', color: 'white', mx: 0.5, '&:hover': { bgcolor: '#22506a' } }}>
          <Work />
        </IconButton>
      </Box>
    </Box>
  );
} 