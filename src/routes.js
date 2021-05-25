import {Route, BrowserRouter, Switch} from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import RegisterUser from "./pages/RegisterUser";
import RegisterInstitution from "./pages/RegisterInstitution";
import Error404 from "./pages/Error404";
import ProjectPage from "./pages/Project";
import Login from './pages/Login/Login';

function Routes() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-xl">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/search" component={Search} />
          <Route path="/login" component={Login} />
          <Route path="/register_user" component={RegisterUser} />
          <Route path="/project/:id" component={ProjectPage} />
          <Route
            path="/register_instituition"
            component={RegisterInstitution}
          />
          <Route path="*" component={Error404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Routes;
