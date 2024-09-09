import { Layout } from "antd";
import AdminSectionSider from "./AdminSectionSider";
import AdminEditeSectionViewer from "./AdmniEditSectionViewer";
import { useOutletContext } from "react-router-dom";

const AdminSectionEditing = ()=>{
    const {menuSections, selectedSection, id, handleNewSectionAdded, handleSectionDeletion} = useOutletContext();
    return (
      <>
        <AdminSectionSider menuItems={menuSections} />
        <Layout>
          <AdminEditeSectionViewer
            selectedSection={selectedSection}
            questionnaireId={id}
            handleNewSectionAdded={handleNewSectionAdded}
            handleSectionDeletion={handleSectionDeletion}
          />
        </Layout>
      </>
    );
}

export default AdminSectionEditing;