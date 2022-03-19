import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main/Main';
import Apply from './pages/Apply/Apply';
import LogIn from './pages/LogIn/LogIn';
import My from './pages/My/My';
import SignUp from './pages/SignUp/SignUp';
import Detail from './pages/Detail/Detail';
import { Redirect } from 'react-router';
import List from 'pages/List/List';
import LoginSearchID from './pages/LogIn/SearchID/LoginSearchID';
import LoginSearchPW from './pages/LogIn/SearchPW/LoginSearchPW';
import Header from 'Components/Header';
import Nav from 'Components/Nav';
import BasicModal from 'Components/BasicModal';
import { useEffect, useState } from 'react';
import MainInfoProject from 'pages/Main/MainInfoProject';
import HamburgerMenu from 'Components/HamburgerMenu';
import Footer from 'Components/Footer';
import Completion from 'pages/Completion/Completion';

const Routers = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!open && !localStorage.getItem('show-modal')) {
      localStorage.setItem('show-modal', true);
      handleOpen();
    }
  }, [open]);

  const [menuOpen, setMenuOpen] = useState('none');

  return (
    <BrowserRouter>
      <Header menuopen={menuOpen} setMenuOpen={setMenuOpen} />
      <Nav />
      <HamburgerMenu menuopen={menuOpen} />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/login' component={LogIn} />
        <Route exact path='/login/searchID' component={LoginSearchID} />
        <Route exact path='/login/searchPW' component={LoginSearchPW} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/product/:productId' component={Detail} />
        <Route exact path='/apply/:productId' component={Apply} />
        <Route exact path='/completion/:productId' component={Completion} />
        <Route path='/my' component={My} />
        <Route exact path='/list' component={List} />
        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
      <Footer />
      <BasicModal open={open} handleClose={handleClose} title={'⚠️ 주의 ⚠️'} content={<MainInfoProject />} />
    </BrowserRouter>
  );
};

export default Routers;
