import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Tabs from '@mui/material/Tabs';
import Description from './Description';
import ProductReview from './ProductReview';
import styled from 'styled-components';
import { tab, mobile, brandColor } from 'styles/theme';

function MenuBar({ newData }) {
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Contain>
      <TabContext value={value}>
        <TabWrapper>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor='secondary'
            indicatorColor='secondary'
            aria-label='secondary tabs example'
            className='tabs'
          >
            <Tab value='1' label='업체정보' />
            <Tab value='2' label='리뷰' />
          </Tabs>
        </TabWrapper>
        <TabPanel value='1'>
          <Description {...{ newData }} />
        </TabPanel>
        <TabPanel value='2'>
          <ProductReview {...{ newData }} />
        </TabPanel>
      </TabContext>
    </Contain>
  );
}

export default MenuBar;

const Contain = styled.div`
  width: 100%;
  & .css-13xfq8m-MuiTabPanel-root {
    ${mobile} {
      padding: 0;
    }
  }
`;

const TabWrapper = styled.div`
  border: 3px solid black;

  & .css-11yukd5-MuiTabs-indicator {
    background-color: ${brandColor};
  }
  & .tabs .css-1a4cg4j-MuiButtonBase-root-MuiTab-root {
    font-size: 1.2rem;
    font-weight: 900;
    color: ${brandColor};
    margin: 0 auto;
    ${tab} {
      font-size: 1rem;
    }
    ${mobile} {
      font-size: 0.8rem;
    }
  }
`;
