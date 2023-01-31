import { useLocation, useNavigate, useParams } from "react-router-dom";

// It was written to support history props in class components in Router 5 as navigate props in class components in Router 6
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter;
