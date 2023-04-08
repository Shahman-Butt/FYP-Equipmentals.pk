import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

// const ProtectedRoute = ({
//   isAdmin,
//   component: Component,
//   redirectUrl,
//   ...rest
// }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//   return (
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               // return <Redirect to="/login" />;
//               return (
//                 <Redirect
//                   to={{ pathname: "/login", state: { redirectUrl: rest.path } }}
//                 />
//               );
//             }

//             if (isAdmin === true && user.role !== "admin") {
//               // return <Redirect to="/login" />;
//               return (
//                 <Redirect
//                   to={{ pathname: "/login", state: { redirectUrl: rest.path } }}
//                 />
//               );
//             }

//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;
const ProtectedRoute = ({
  isAdmin,
  component: Component,
  redirectUrl,
  ...rest
}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return (
                <Redirect
                  to={{
                    pathname: "/login",
                    // search: `?redirect=${encodeURIComponent(rest.path)}`,
                    state: { redirectUrl: rest.path },
                  }}
                />
              );
            }

            if (isAdmin === true && user.role !== "admin") {
              return (
                <Redirect
                  to={{
                    pathname: "/login",
                    // search: `?redirect=${encodeURIComponent(rest.path)}`,
                    state: { redirectUrl: rest.path },
                  }}
                />
              );
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
