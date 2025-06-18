import { Layout as AntLayout, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { toggleTheme } from "../../service/features/themeSlice";


const { Header, Content, Footer } = AntLayout;

const Layout = () => {
	const dispatch = useDispatch();
	const theme = useSelector((state : any )=> state.theme );

	const onThemeChange = () => {
		dispatch(toggleTheme());
	};

	

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header style={{backgroundColor: 'transparent', fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        MovieMates
        <Switch
          checked={theme.darkMode}
          onChange={onThemeChange}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />
	  </Header>

      <Content style={{ padding: "2rem" }}>
        <Outlet />
      </Content>



      <Footer style={{ textAlign: "center" }}>
        © {new Date().getFullYear()} MovieMates
      </Footer>
    </AntLayout>
  );
};

export default Layout;