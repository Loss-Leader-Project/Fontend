import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main/Main';
import Apply from './pages/Apply/Apply';
import LogIn from './pages/LogIn/LogIn';
import My from './pages/My/My';
import SignUp from './pages/SignUp/SignUp';
import Detail from './pages/Detail/Detail';
import { Redirect } from 'react-router';
import List from 'pages/List/List';
import LoginSearchID from './pages/LogIn/LoginSearchID';
import LoginSearchPW from './pages/LogIn/LoginSearchPW';
import Header from './Components/Header';
import Nav from 'Components/Nav';

const Routers = () => {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/my' component={My} />
        <Route exact path='/login' component={LogIn} />
        <Route exact path='/login/searchID' component={LoginSearchID} />
        <Route exact path='/login/searchPW' component={LoginSearchPW} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/product' component={Detail} />
        <Route exact path='/apply' component={Apply} />
        <Route
          exact
          path={['/list/:name', '/list']}
          render={({ match: { params } }) => {
            const { name } = params;
            return <List name={name} />;
          }}
        />
        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routers;
