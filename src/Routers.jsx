import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main/Main';
import Apply from './pages/Apply/Apply';
import LogIn from './pages/LogIn/LogIn';
import My from './pages/My/My';
import SignUp from './pages/SignUp/SignUp';
import Detail from './pages/Detail/Detail';
import { Redirect } from 'react-router';

const Routers = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/my' component={My} />
        <Route exact path='/login' component={LogIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/product' component={Detail} />
        <Route exact path='/apply' component={Apply} />
        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routers;
