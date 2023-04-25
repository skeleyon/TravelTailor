import { useEffect } from "React";
import AuthService from "../services/AuthService";

const Layout = () => {
  useEffect(() => {
    AuthService.checkAuthenticated();
    AuthService.loadUser();
  }, []);
};

export default Layout;
