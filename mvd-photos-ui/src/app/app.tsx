import React from "react";
import { Switch } from "react-router";
import { Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from "@material-ui/core/CssBaseline";

import { SignIn } from "containers/signin";
import { Main } from "containers/main";
import { NotFound } from "containers/not-found";

import { useModals } from "./services/modals/useModals";
import { useAuth } from "./services/user/useAuth";
import { AlertDialog } from "components/alert-dialog";
import CustomRoute from "components/route";
import { ServerAlert } from "./shared/server-alert";
import { theme } from "./customTheme";
import { UsersModule } from "containers/users";
import { DevicesModule } from "containers/devices";
import Modals from "containers/modals";
import { useUserPermissions } from "./services/user/useUserPermissions";

const App: React.FC = () => {
  const { isAdmin, isLogged } = useAuth();
  useUserPermissions();
  const { isModal, previousLocation, location } = useModals();

  return (
    <ThemeProvider theme={theme}>
      <Main>
        test
        <CssBaseline />
        <ToastContainer />
        <ServerAlert />
        <AlertDialog>
          <Switch location={isModal ? previousLocation : location}>
            <Route path="/signin" component={SignIn} />
            <CustomRoute
              exact={true}
              canActive={() => false}
              path="/"
              redirectTo="/devices"
              component={() => null}
            />
            <CustomRoute
              canActive={() => isAdmin}
              path="/users"
              redirectTo="/devices"
              component={UsersModule}
            />
            <CustomRoute
              canActive={() => isAdmin}
              path="/users/add"
              redirectTo="/devices"
              exact={true}
              component={UsersModule}
            />
            <CustomRoute
              canActive={() => isLogged}
              path="/devices"
              redirectTo="/signin"
              exact={true}
              component={DevicesModule}
            />
            <CustomRoute
              canActive={() => isLogged}
              path="/devices/:id"
              redirectTo="/signin"
              exact={true}
              component={DevicesModule}
            />
            <NotFound />
          </Switch>
          {isModal ? (
            <CustomRoute
              canActive={() => isLogged}
              path="/modals"
              component={Modals}
              redirectTo="/signin"
            />
          ) : null}
        </AlertDialog>
      </Main>
    </ThemeProvider>
  );
};

export default App;
