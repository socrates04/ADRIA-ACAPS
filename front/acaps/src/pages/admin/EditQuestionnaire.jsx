import { useState, useEffect } from 'react';
import { Layout, message } from 'antd';
import axios from 'axios';
import { Outlet, useParams } from 'react-router-dom';
import API_ROUTES from '../../apiRoutes';
import mocQuestionnaire from '../../Data/mocQuestionnaire';
import AdminEditingHeader from '../../components/AdminEditingHeader';


const EditQuestionnaire = () => {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [menuSections,setmenuSections] = useState([]);
  const [questionnaireDetails, setQuestionnaireDetails ] = useState();

  const [validationLoading, setValidationLoading] = useState(false);
  const [publishingLoading, setPublishingLoading] = useState(false);

  const addSectionItem = {
    key: 'add-new-section',
    label: 'Add New Section',
    onClick: () => setSelectedSection('add-new-section'),
  };

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await axios.get(`${API_ROUTES.getQuestionnaires}/${id}`);

        setQuestionnaire(response.data);
        if (response.data.sections.length > 0) {
          setSelectedSection(response.data.sections[0]); // Automatically select the first section
        }
      } catch (error) {
        console.error('Error fetching questionnaire:', error);
        // tempo
        setQuestionnaire(mocQuestionnaire);
        setSelectedSection(mocQuestionnaire.sections[0]);
      }
    };
    fetchQuestionnaire();
  }, [id]);

  useEffect(() => {
    const constructItemsFromQuestionnaire = async () => {
      if (questionnaire) {
        // menu items for section navigation
        const mi = questionnaire.sections.map((section, index) => ({
          key: index.toString(),
          label: section.title,
          onClick: () => handleSectionClick(section),
        }));
        setmenuSections([...mi, addSectionItem]);

        // questionnaire details for discription
        const {
          title, creationDate, validated, validationDate, distributed, validationScore, 
          nbrSubmissions, lastUpdated, validatorName, creatorName,
        } = questionnaire;

        const nbrSections = questionnaire.sections.length;
        setQuestionnaireDetails({
          title, creationDate, validated, validationDate, distributed, validationScore, nbrSubmissions,
          lastUpdated, validatorName, creatorName, nbrSections  
        });
      }
    };
    constructItemsFromQuestionnaire();
  }, [questionnaire]);

  const handleSectionClick = (section) => { setSelectedSection(section); };

  const handleNewSectionAdded = (newQuestionnaire) => {
    setQuestionnaire(newQuestionnaire);
  };

  const validateQuestionnaire = async () => {
    try {
      setValidationLoading(true);
      const targetState = questionnaire.validated? "false": "true";
      const response = await axios.post(API_ROUTES.validateQuestionnaire(id,targetState));
      if (response.status==200) message.success("action seccessful.")
      setQuestionnaire(response.data); // new Questionnaire
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error("Cannot validate questionnaire:", error.response.data.message);
        message.error(error.response.data.message);  // Display the error to the user
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }finally{
      setValidationLoading(false);
    }
  };

  const questionnairePublication = async () => {
    try {
      setPublishingLoading(true);
      const targetState = questionnaire.distributed? "false": "true";
      const response = await axios.put(API_ROUTES.publishQuestionnaire(id,targetState));
      if (response.status==200) message.success("action seccessful.")
      setQuestionnaire(response.data); // Update the questionnaire state
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error("Cannot publish questionnaire:", error.response.data.message);
        message.error(error.response.data.message);  // Display the error to the user
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setPublishingLoading(false); // Stop loading (whether success or error)
    }
  };
  
  const handleSectionDeletion = async ()=>{
    console.log(`trying to delete section: ${selectedSection.title}.`);
    try{
      const response = await axios.put(API_ROUTES.removeQuesionnaireSection(id,selectedSection.title));
      setQuestionnaire( response.data);
    }catch(error){
      console.log(error);
      
    }
  }


  return (
    <Layout style={{ height: "100%", padding:"0", }}>

      <AdminEditingHeader />
      
      <Layout> 
        <Outlet context={{
          selectedSection, id, menuSections, handleNewSectionAdded, handleSectionDeletion, // section editing
          questionnaireDetails, validateQuestionnaire, validationLoading, questionnairePublication, publishingLoading, // questionnaire details
          questionnaire,
        }}/>
      </Layout>

    </Layout>
  );
};

export default EditQuestionnaire;
