import {
  Grid,
  Box,
  Input,
  FormControl,
  FormLabel,
  Image,
  Select,
  Textarea,
  Button
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDataAPI } from './../utils/fetchData';
import { createBlog, updateBlog } from './../redux/actions/blogActions';
import { GLOBAL_TYPES } from './../redux/types/globalTypes';
import { isContentChange } from './../utils/validator';
import ReactQuill from './../components/editor/ReactQuill';

const CreateBlog = ({id}) => {
  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    category: ''
  });
  const [body, setBody] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [oldData, setOldData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {auth, alert, category} = useSelector(state => state);

  const handleChange = e => {
    const {name, value} = e.target;
    setBlogData({...blogData, [name]: value});
  }

  const handleChangeImage = e => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 2) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Maximum thumbnail size is 2MB.'
        }
      });
    }
    setThumbnailPreview(file);
    setBlogData({...blogData, thumbnail: file});
  }

  const handleSubmit = async() => {
    if (!blogData.title || !blogData.description || !body || !blogData.thumbnail || !blogData.category) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Please provide all field.'
        }
      });
    }

    if (blogData.title.length < 10 || blogData.title.length > 50) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Title length should be in range of 10 and 50 characters.'
        }
      });
    }

    if (blogData.description.length < 50 || blogData.description.length > 400) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Description length should be in range of 50 and 400 characters.'
        }
      });
    }

    if (body.length < 2000) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Content should be at least 2000 characters.'
        }
      });
    }

    const data = {
      ...blogData,
      content: body
    };

    if (id) {
      if (!isContentChange(data, oldData)) {
        await dispatch(updateBlog(data, id, auth.token));
      } else {
        return dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: {
            errors: 'Nothing changed on the blog.'
          }
        })
      }
    } else {
      await dispatch(createBlog(data, auth.token));
    }

    navigate(`/profile/${auth.user?._id}`);
  }

  useEffect(() => {
    if (!id) return;

    const fetchBlogData = async() => {
      await getDataAPI(`blog/${id}`)
        .then(res => {
          setBlogData(res.data.blog);
          setOldData(res.data.blog);
          setBody(res.data.blog.content);
        })
        .catch(err => {
          console.log(err);
        });
    }

    fetchBlogData();
  }, [id]);

  return (
    <Box p={{ base: '30px 35px', md: '30px 100px' }}>
      <Grid
        templateColumns="repeat(auto-fit, minmax(400px, 1fr))"
        gap="10"
      >
        <Box>
          <FormControl>
            <FormLabel>Thumbnail</FormLabel>
            <Box
              justifyContent='space-between'
              d='flex'
            >
              {
                (thumbnailPreview || id) && 
                <Box
                  w='250px'
                  h='120px'
                  borderRadius='5px'
                  border='1px'
                  borderColor='gray.700'
                  mr='20px'
                >
                  <Image
                    src={
                      id
                      ? thumbnailPreview
                        ? URL.createObjectURL(thumbnailPreview)
                        : blogData.thumbnail
                      : thumbnailPreview
                        ? URL.createObjectURL(thumbnailPreview)
                        : ''
                    }
                    alt={`Bloggy - ${blogData.title}`}
                    w='100%'
                    h='100%'
                    objectFit='cover'
                    borderRadius='5px'
                  />
                </Box>
              }
              <Input 
                type='file'
                accept='image/*'
                onChange={handleChangeImage}
              />
            </Box>
          </FormControl>
          <FormControl mt='5'>
            <FormLabel>Title</FormLabel>
            <Input
              type='text'
              name='title'
              value={blogData.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt='5'>
            <FormLabel>Description</FormLabel>
            <Textarea
              name='description'
              value={blogData.description}
              onChange={handleChange}
              resize='none'
            />
          </FormControl>
          <FormControl mt='5'>
            <FormLabel>Category</FormLabel>
            <Select name='category' value={blogData.category} onChange={handleChange}>
              <option value="">- Select Category -</option>
              {
                category.map(item => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <ReactQuill body={body} setBody={setBody} />
          </FormControl>
        </Box>
      </Grid>
      <Box textAlign='right' mt='7'>
        <Button
          isLoading={alert.loading ? true : false}
          loadingText='Loading'
          onClick={handleSubmit}
          bg='orange.400'
          _hover={{ bg: 'orange.600' }}
          _active={{ bg: 'orange.600' }}
        >
          {id ? 'Update' : 'Submit'}
        </Button>
      </Box>
    </Box>
  );
}

export default CreateBlog;