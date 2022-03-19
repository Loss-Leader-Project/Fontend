import React, { useCallback, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { ApiRq } from 'utils/apiConfig';

const Editor = ({ editorValue, setEditorValue, editorImgs, imgOnChange }) => {
  const quillRef = useRef(null);

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    const uploadFile = async file => {
      const UPLOAD_ENDPOINT = '/review/image-upload';
      const formData = new FormData();
      formData.append('image', file);
      const { data: url } = await ApiRq('post', UPLOAD_ENDPOINT, null, formData);
      return url;
    };

    input.addEventListener('change', async ({ target }) => {
      try {
        if (editorImgs.length === 5) return;
        const file = target.files[0];
        const url = await uploadFile(file);
        imgOnChange(url);
      } catch (error) {
        alert('업로드에 실패했습니다.');
      }
    });
  }, [imgOnChange, editorImgs]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
          ['image'],
        ],
        handlers: { image: imageHandler },
      },
    }),
    [imageHandler]
  );

  return (
    <ReactQuillWrapper>
      <ReactQuill
        ref={element => {
          if (element !== null) quillRef.current = element;
        }}
        value={editorValue}
        onChange={setEditorValue}
        modules={modules}
        theme='snow'
        placeholder='내용을 입력해주세요.'
      />
    </ReactQuillWrapper>
  );
};

const ReactQuillWrapper = styled.div`
  .ql-editor {
    height: 450px;
  }
  margin-bottom: 10px;
`;

export default Editor;
