import { Layout, Menu } from "antd";

const {Sider} = Layout;

const AdminSectionSider=({menuItems})=>{
    return (
      <Sider width={200} >
        <Menu
          mode="inline"
          defaultSelectedKeys={["0"]}
          style={{
            height: "100%",
          }}
          items={menuItems}
        />
      </Sider>
    );
};

export default AdminSectionSider;