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
    <div>
      <ReactQuill
        theme='snow'
        modules={modules}
        onChange={e => setBody(e)}
        value={body}
      />
    </div>
  );
}

export default CommentQuill;