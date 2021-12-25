import { useEffect, useRef, useCallback } from 'react';
import { uploadImage } from './../../utils/imageHandler';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const container = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],

  [{ 'size': ['small', false, 'large', 'huge'] }], 
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean', 'link', 'image', 'video']
];

const Quill = ({body, setBody}) => {
  const quillRef = useRef();
  const modules = {toolbar: {container}};

  const handleChangeImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = async e => {
      const file = input.files[0];
      const photo = await uploadImage(file, 'blogs');

      const quill = quillRef.current;
      const range = quill?.getEditor().getSelection()?.index;
      if (range !== undefined) {
        quill?.getEditor().insertEmbed(range, 'image', photo.secure_url);
      }
    }
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    let toolbar = quill.getEditor().getModule('toolbar');
    toolbar.addHandler('image', handleChangeImage);
  }, [handleChangeImage]);

  return (
    <div>
      <ReactQuill
        theme='snow'
        modules={modules}
        placeholder="Write content ..."
        ref={quillRef}
        value={body}
        onChange={e => setBody(e)}
      />
    </div>
  );
}

export default Quill;