import { Button, Layout, Popconfirm, Space, theme } from "antd";
import AddNewSectionForm from "./AddNewSectionForm";
import SectionForm from "./SectionForm";

const {Content} = Layout;

const AdminEditeSectionViewer = ({
    selectedSection,questionnaireId,handleNewSectionAdded,handleSectionDeletion
  })=>{

    const {token} = theme.useToken();

    return (
      <Content
        style={{
          padding: 10,
          marginLeft: 1,
          background: token.colorBgContainer,
        }}
      >
        {selectedSection === "add-new-section" ? (
          <AddNewSectionForm
            questionnaireId={questionnaireId}
            onSectionAdded={handleNewSectionAdded}
          />
        ) : selectedSection ? (
          <Space direction="vertical" style={{width:'100%'}}>
            <Popconfirm
              title={`Removing section '${selectedSection.title}'`}
              description="This action is not reversable. Are you sure you want to continue?"
              okText="Yes" cancelText="Cancel"
              onConfirm={handleSectionDeletion}
            >
              <Button 
                type="primary" danger
              >Remove section</Button>
            </Popconfirm>

            <SectionForm  
              onSectionAdded={handleNewSectionAdded} 
              questionnaireId={questionnaireId}
              section={selectedSection}
            />
          </Space>
          
        ) : (
          <div className=" w-full flex justify-center">Select a section to view its questions</div>
        )}
      </Content>
    );
};

export default AdminEditeSectionViewer;