import React, { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { client } from 'utils/api';
const Editor = ({ editorValue, setEditorValue, imgOnChange }) => {
  const quillRef = useRef(null);

  const imageHandler = () => {
    console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    const inputChange = async () => {
      console.log('온체인지');
      const file = input.files[0];
      const formData = new FormData();

      // post 이미지 등록 url : localhost:8000/review/image-upload
      // delete 이미지 삭제 url : localhost:8000/review/image-delete
      // put 이미지 업데이트 url: localhost:8000/review/image-update

      try {
        // const _result = await client.post('/review/image-upload', formData);
        // 더미데이터
        const result = {
          data: {
            url: 'https://megacoffee-project.s3.ap-northeast-2.amazonaws.com/menus/ecffab8c-29da-40c2-8c10-6f0d4f8d3663.jpg',
          },
        };
        console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
        const IMG_URL = result.data.url;
        // imgOnChange(IMG_URL);
        imgOnChange('ecffab8c-29da-40c2-8c10-6f0d4f8d3663.jpg');
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', IMG_URL);
      } catch (error) {
        alert('업로드에 실패했습니다.');
      }
    };

    input.addEventListener('change', inputChange);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
          ['image'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
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
