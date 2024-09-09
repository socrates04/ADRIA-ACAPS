import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { theme } from "antd";

const {Content} = Layout;

const AdminContent= ()=>{
    
    const {token} = theme.useToken();

    return (
      <Content
        style={{
          margin: "24px 16px",
          padding: 0,
          minHeight: 280,
          backgroundColor: token.colorBgContainer,
          borderRadius: token.borderRadiusLG,
        }}
      >
        <div
          style={{
            minHeight: 360,
            // background: token.colorBgContainer,
            // borderRadius: token.borderRadiusLG,
            height: '100%'
          }}
        >
          <Outlet />
        </div>
      </Content>
    );
};

export default AdminContent;