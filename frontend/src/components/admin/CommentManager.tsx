import { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box } from '@mui/material';

interface Comment {
  id: number;
  content: string;
  author: string;
  postId: number;
  createdAt: string;
}

export default function CommentManager() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/v1/library/comment/getAllComment')
      .then(res => {
        if (!res.ok) throw new Error('Lỗi khi lấy danh sách bình luận');
        return res.json();
      })
      .then(data => {
        setComments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Quản lý Bình luận</Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>Tác giả</TableCell>
                <TableCell>ID Bài viết</TableCell>
                <TableCell>Ngày tạo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments.map((cmt) => (
                <TableRow key={cmt.id}>
                  <TableCell>{cmt.id}</TableCell>
                  <TableCell>{cmt.content}</TableCell>
                  <TableCell>{cmt.author}</TableCell>
                  <TableCell>{cmt.postId}</TableCell>
                  <TableCell>{cmt.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
} 