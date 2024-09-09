import { Button, Layout, Menu, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import {FileOutlined, SunOutlined, MoonOutlined} from '@ant-design/icons';

const {Sider} = Layout;

// menu items
function getItem(label, key /* also the url extention */, icon, children) {
  return { key, icon, children, label };
}

const items = [
  getItem("Questionnaires", "questionnaire", <FileOutlined />)
];
  
  // styling the sider ( side bar)
  const siderStyle = {
    position: "fixed",
    top: 0,
    bottom: 0,
    overflow: "initial",
  };  

const AdminSider= ({toggleTheme})=>{
    
    // navigation from the menu    
    const navigate = useNavigate();
    const handleMenuNavigation= (e)=>{ navigate(e.key); console.log("item has been clicked",e.key); };

    return (
      <Sider style={siderStyle}>

        <div className=" w-full h-20 flex justify-center items-center">
          <Switch 
            checkedChildren={<SunOutlined />}
            unCheckedChildren={<MoonOutlined />}
            onChange={toggleTheme}
            // defaultChecked
          />
        </div>

        <Menu
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
          onClick={handleMenuNavigation}
          style={{height:'100%'}}
        />
      </Sider>
    );
};

export default AdminSider;