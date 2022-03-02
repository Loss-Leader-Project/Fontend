import Title from 'Components/common/Title';
import AdditionalInfo from './AdditionalInfo';
import BasicInfo from './BasicInfo';
import { ModifyProvider } from 'contexts/ModifyProvider';
import React from 'react';
import styled from 'styled-components';
import { mobile } from 'styles/theme';

const ModifyPage = () => {
  return (
    <ModifyProvider>
      <Title text='기본정보' />
      <Layout>
        <BasicInfo />
      </Layout>
      <Title text='부가정보' />
      <Layout>
        <AdditionalInfo />
      </Layout>
    </ModifyProvider>
  );
};

const Layout = styled.div`
  padding: 2.1875rem 3.125rem;
  border-top: 0.0625rem solid #8a8a8a;

  ${mobile} {
    padding: 2.1875rem 1.25rem;
  }
`;

export default ModifyPage;
