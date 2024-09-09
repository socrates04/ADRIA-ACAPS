import { Layout, theme, ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSider from "../../components/AdminSider";
import AdminHeader from "../../components/AdminHeader";
import AdminContent from "../../components/AdminContent";

const {Content } = Layout;

const AdminDashBoard = () => {

    // light/darck mode management
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const { token} = theme.useToken();

    return (
        <ConfigProvider
            theme={{ algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}
        >
            <Layout
                hasSider
                style={{
                    minHeight: "100vh",
                }}
                theme="dark"
            >
                <AdminSider toggleTheme={toggleTheme} />

                <Layout
                    style={{
                        marginInlineStart: 200,
                    }}
                >
                    <AdminHeader/>

                    <AdminContent/>

                </Layout>
            </Layout>
        </ConfigProvider>
  );
};
export default AdminDashBoard;
