import { Route, BrowserRouter, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search/Search";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import RegisterInstitution from "./pages/RegisterInstitution/RegisterInstitution";
import Error404 from "./pages/Error/Error404";
import ProjectPage from "./pages/Project/Project";
import Login from "./pages/Login/Login";
import PrivateRoute from "./privateRoute/Private";
import Profile from "./pages/Profile/Profile";
import TermosVoluntariado from "./pages/Termos/TermosVoluntariado"
import TermosDePrivacidade from "./pages/Termos/TermosDePrvacidade";
import RegisterJob from "./components/RegisterJob/RegisterJob";

import InstituitionProfile from "./pages/InstitutionProfile/InstituitionProfile";


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/search" component={Search} />
        <Route path="/login" component={Login} />
        <Route path="/register_user" component={RegisterUser} />
        <PrivateRoute path='/user/:id' component={Profile} />
        <PrivateRoute path='/institution/:id' component={InstituitionProfile} />
        <Route path="/project/:id" component={ProjectPage} />
        <Route path="/register_institution" component={RegisterInstitution} />
        <Route path="/termos/voluntariado" component={TermosVoluntariado} />
        <Route path="/termos/privacidade" component={TermosDePrivacidade} />
        <Route path="/register-job" component={RegisterJob} />
        <Route path="*" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;
