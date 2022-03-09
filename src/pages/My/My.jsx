import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import styled from 'styled-components';
import BuyPage from 'pages/My/Buy/BuyPage';
import CouponPage from 'pages/My/Coupon/CouponPage';
import MyMenu from './MyMenu';
import ReviewPage from 'pages/My/Review/ReviewPage';
import ModifyPage from 'pages/My/Modify/ModifyPage';
import { tab } from 'styles/theme';
import ReviewInsertPage from './ReviewInsert/ReviewInsertPage';
import { Redirect } from 'react-router-dom';

const My = () => {
  const { path } = useRouteMatch();

  return (
    <MyWrapper>
      <MyMenu path={path} />
      <MyRouteWrapper>
        <Switch>
          <Route path={`${path}`} component={ModifyPage} exact />
          <Route path={`${path}/buy`} component={BuyPage} />
          <Route path={`${path}/coupon`} component={CouponPage} />
          <Route path={`${path}/review`} component={ReviewPage} exact />
          <Route path={`${path}/review/insert`} component={ReviewInsertPage} />
          <Route path='*' render={() => <Redirect to={'/'} />} />
        </Switch>
      </MyRouteWrapper>
    </MyWrapper>
  );
};

const MyWrapper = styled.section`
  display: flex;
  margin-top: 2.1875rem;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  margin-bottom: 1.25rem;
  ${tab} {
    margin-left: 0.625rem;
    margin-right: 0.625rem;
    margin-bottom: 0.625rem;
    flex-direction: column;
  }
`;

const MyRouteWrapper = styled.div`
  flex: 8;
`;

export default My;
