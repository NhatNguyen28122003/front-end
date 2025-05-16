import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box
} from '@mui/material';
import HomeBg from '../assets/BackGroundHome.png';

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  category: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/v1/library/book/getAllBook')
      .then(res => {
        if (!res.ok) throw new Error('Lỗi khi lấy danh sách sách');
        return res.json();
      })
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${HomeBg})`,
        backgroundSize: '120% 120%',
        backgroundPosition: 'center',
        width: '100%',
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, background: 'rgba(255,255,255,0.85)', borderRadius: 2 }}>
        {loading ? (
          <Typography>Đang tải...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={2}>
            {books.map((book) => (
              <div key={book.id} style={{ flexBasis: '25%', maxWidth: '25%', padding: 8, boxSizing: 'border-box', display: 'flex' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={book.cover}
                    alt={book.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {book.title}
                    </Typography>
                    <Typography>
                      Tác giả: {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Thể loại: {book.category}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
} 