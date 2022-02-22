import Button from 'Components/common/Button';
import Title from 'Components/common/Title';
import AdditionalInfo from './AdditionalInfo';
import BasicInfo from './BasicInfo';
import ModifyProvider from 'contexts/ModifyProvider';
import React from 'react';
import styled from 'styled-components';
import { mobile } from 'styles/theme';

const ModifyPage = () => {
  return (
    <Form>
      <ModifyProvider>
        <Title text='기본정보' />
        <BasicInfo />
        <Title text='부가정보' />
        <AdditionalInfo />
      </ModifyProvider>
      <ButtonWrapper>
        <Button text='취소' width='15%' bg='#f7f7f7' color='#8a8a8a' />
        <Button text='정보수정' width='15%' />
      </ButtonWrapper>
    </Form>
  );
};

export function withLayout(Compo) {
  return () => (
    <Layout>
      <Compo />
    </Layout>
  );
}

const Form = styled.form`
  margin-bottom: 0.9375rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.9375rem;

  ${mobile} {
    button {
      width: 50%;
    }
  }
`;

const Layout = styled.div`
  padding: 2.1875rem 3.125rem;
  border-top: 0.0625rem solid #8a8a8a;

  ${mobile} {
    padding: 2.1875rem 1.25rem;
  }
`;

export default ModifyPage;
