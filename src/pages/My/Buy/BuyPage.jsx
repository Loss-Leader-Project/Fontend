import Pages from 'Components/Pages';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { mobile } from 'styles/theme';
import { ApiRq } from 'utils/apiConfig';
import { myApiURL } from 'utils/apiUrl';
import BuyItem from './BuysItem';
import BuysHead from './BuysHead';
import UserInfo from './UserInfo';
import { useHistory } from 'react-router-dom';
import { TokenCheck } from 'utils/api';
import Validation from 'utils/validation';
import Empty from 'Components/Empty';

const USER_INFO_INIT = {
  loginId: '',
  mileage: 0,
};

const BuyPage = () => {
  const [buys, setBuys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userInfo, setUserInfo] = useState(USER_INFO_INIT);
  const totalPagesRef = useRef(1);
  const { emptyCheck } = Validation;
  const history = useHistory();

  const handleError = message => alert(message);

  const fetchBuys = useCallback(
    async pageNumber => {
      try {
        const url = `${myApiURL.GET_BUYS}?page=${pageNumber}`;
        const { data } = await TokenCheck(Authorization => ApiRq(`get`, url, null, null, { Authorization }), history);
        const { content, number, totalPages } = data;
        totalPagesRef.current = totalPages;
        setCurrentPage(number);
        setBuys(content);
      } catch (error) {
        handleError('에러가 발생했습니다.');
      }
    },
    [history]
  );

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const { data } = await TokenCheck(null, history);
        setUserInfo(prevUserInfo => ({ ...prevUserInfo, ...data }));
      } catch (error) {
        handleError('에러가 발생했습니다.');
      }
    }
    fetchUserInfo();
  }, [history]);

  useEffect(() => fetchBuys(0), [fetchBuys]);

  const isEmpty = emptyCheck(buys);

  return (
    <BuyPageWrapper>
      <UserInfo id={userInfo.loginId} mileage={userInfo.mileage} />
      <BuysWrapper>
        <BuysHead />
        {isEmpty ? (
          <Empty text='구매 내역이 없습니다.' />
        ) : (
          buys.map(item => <BuyItem key={item.orderNumber} {...item} />)
        )}
      </BuysWrapper>
      {!isEmpty && (
        <Pages
          changeCurrentPage={pageNumber => fetchBuys(pageNumber - 1)}
          totalPage={totalPagesRef.current}
          currentPage={currentPage + 1}
        />
      )}
    </BuyPageWrapper>
  );
};

const BuyPageWrapper = styled.div`
  margin-bottom: 0.9375rem;
`;

const BuysWrapper = styled.div`
  margin-top: 4.375rem;
  ${mobile} {
    margin-top: 1.875rem;
  }
`;

export default BuyPage;
