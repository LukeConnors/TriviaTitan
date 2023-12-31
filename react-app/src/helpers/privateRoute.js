import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }

  export default PrivateRoute;
