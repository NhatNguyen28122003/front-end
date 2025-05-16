import { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box } from '@mui/material';
import BookListBg from '../../assets/BookList.jpg';

interface Book {
  code: string;
  title: string;
  author: string;
  url: string;
  pages: number;
  categoryCode: string[];
}

export default function BookManager() {
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
        backgroundImage: `url(${BookListBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        py: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: '90%', background: 'rgba(255,255,255,0.92)', borderRadius: 3, boxShadow: 6, p: 4 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 700, mb: 3 }}>Quản lý Sách</Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Mã sách</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Tiêu đề</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Tác giả</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>URL</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Số trang</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Danh mục</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.code}>
                    <TableCell>{book.code}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.url}</TableCell>
                    <TableCell>{book.pages}</TableCell>
                    <TableCell>{book.categoryCode?.join(', ')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
} 