import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogById } from './../../redux/actions/blogActions';
import { createComment, getComments } from './../../redux/actions/commentActions';
import Comment from './../../components/comment/Comment';
import ReplyInput from './../../components/comment/ReplyInput';
import Pagination from './../../components/global/Pagination';
import Spinner from './../../components/global/Spinner';

const BlogDetail = () => {
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState([]);
  const {slug: id} = useParams();

  const dispatch = useDispatch();
  const {alert, auth, comment, socket, blogDetail} = useSelector(state => state);

  const handleSubmit = content => {
    const data = {
      content,
      user: auth.user,
      blog_id: blogDetail._id,
      blog_user_id: blogDetail.user,
      createdAt: new Date().toISOString()
    };

    setShowComments([data, ...showComments]);
    dispatch(createComment(data, auth));
  }

  const fetchComments = useCallback(async(page = 1) => {
    setLoading(true);
    await dispatch(getComments(id, page));
    setLoading(false);
  }, [dispatch, id]);

  const handlePagination = page => {
    fetchComments(page);
  }

  useEffect(() => {
    if (!id) return;
    dispatch(getBlogById(id));
    fetchComments();
  }, [dispatch, id, fetchComments]);

  useEffect(() => {
    setShowComments(comment.data);
  }, [comment]);

  useEffect(() => {
    if (!id || !socket) return;
    socket.emit('joinRoom', id);
    return () => {
      socket.emit('outRoom', id);
    }
  }, [socket, id]);

  return (
    <>
      {
        alert.loading
        ? (
          <Spinner />
        )
        : (
          <div className='blogDetail container'>
            <h1>{blogDetail.title}</h1>
            <div className='blogDetail__info'>
              <p>By: <Link to={`/profile/${blogDetail.user?._id}`}>{blogDetail.user?.name}</Link></p>
              <p>{new Date(blogDetail.createdAt).toLocaleString()}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: blogDetail.content }} />
            <div className='blogDetail__comment'>
              <h2>Comments</h2>
              {
                auth.token
                ? <ReplyInput callback={handleSubmit} />
                : (
                  <p className='blogDetail__loginLink'><Link to={`/login?blog=${blogDetail._id}`}>Login</Link> to post your comment.</p>
                )
              }

              {
                loading
                ? (
                  <Spinner />
                )
                : (
                  <>
                    {
                      showComments.map(comm => (
                        <Comment key={comm._id} comment={comm} />
                      ))
                    }
                  </>
                )
              }

              {
                comment.totalPage > 1 &&
                <Pagination
                  page={comment.totalPage}
                  callback={handlePagination}
                />
              }
            </div>
          </div>
        )
      }
    </>
  );
}

export default BlogDetail;