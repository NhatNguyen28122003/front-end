import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Skeleton,
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface Book {
  id: string;
  title: string;
  coverUrl: string;
  publishedYear: string;
  viewCount: number;
}

const API_URL = 'http://localhost:8080/api/v1/library/books/getAllBook';

export default function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Auto scroll
  useEffect(() => {
    if (!scrollRef.current) return;
    autoScrollRef.current = setInterval(() => {
      if (!scrollRef.current) return;
      scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }, 3000);
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [books]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -250 : 250;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
          Sách giáo khoa
        </Typography>
      </Box>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={() => handleScroll('left')}
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            zIndex: 2,
            transform: 'translateY(-50%)',
            background: 'white',
            boxShadow: 2,
          }}
        >
          <ArrowBackIos />
        </IconButton>
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            gap: 2,
            px: 6,
            py: 2,
          }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} variant="rectangular" width={220} height={340} />
              ))
            : books.map((book) => (
                <Card key={book.id} sx={{ minWidth: 220, maxWidth: 220, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={book.coverUrl || '/no-image.png'}
                    alt={book.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={700} noWrap>
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Năm xuất bản: {book.publishedYear}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      👁️ {book.viewCount} lượt đọc
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="outlined">Xem chi tiết</Button>
                  </CardActions>
                </Card>
              ))}
        </Box>
        <IconButton
          onClick={() => handleScroll('right')}
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            zIndex: 2,
            transform: 'translateY(-50%)',
            background: 'white',
            boxShadow: 2,
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
} 