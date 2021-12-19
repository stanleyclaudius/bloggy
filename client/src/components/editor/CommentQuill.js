import { Box } from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const container = [
  [{ 'font': [] }],
  ['bold', 'italic', 'underline', 'strike'],        
  ['blockquote', 'code-block', 'link'],
  [{ 'color': [] }, { 'background': [] }],          
  [{ 'script': 'sub'}, { 'script': 'super' }]
];

const CommentQuill = ({body, setBody}) => {
  const modules = {toolbar: {container}};

  return (
    <Box>
      <ReactQuill
        theme='snow'
        modules={modules}
        onChange={e => setBody(e)}
        value={body}
      />
    </Box>
  );
}

export default CommentQuill;