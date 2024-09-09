import { Layout } from "antd";
import { theme, Breadcrumb } from "antd";

const {Header} = Layout;

const AdminHeader = ()=>{

    const {token}= theme.useToken();

    return (
      <Header
        style={{
          padding: 0,
          background: token.colorBgContainer,
          display: "flex",
        }}
      >
        <Breadcrumb
          className=" align-baseline text-lg"
          style={{
            margin: "16px",
          }}
          items={[{ title: "User" }, { title: "Bill" }]}
        />
      </Header>
    );
};

export default AdminHeader;