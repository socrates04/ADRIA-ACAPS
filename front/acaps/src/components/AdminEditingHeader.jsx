import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

const {Header} = Layout;


function getItem(label, key /* also the url extention */, icon, children) {
  return { key, icon, children, label };
}

const headerMenuIems = [
  getItem("Basic info", ""),
  getItem("sections", "sections"),
  getItem("Section Preview", "sections/preview")
];

const AdminEditingHeader= ()=>{

    const {token} = theme.useToken();

    const navigate = useNavigate();
    const handleHeaderNavigation= (e)=>{ navigate(e.key); };  

    return (
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: token.colorPrimary,
          text: token.colorText,
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[""]}
          items={headerMenuIems}
          style={{
            flex: 1,
            minWidth: 0,
            background: token.colorPrimary,
            text: token.colorText,
          }}
          onClick={handleHeaderNavigation}
        />
      </Header>
    );
}
export default AdminEditingHeader;