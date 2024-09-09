// route URL for the backend API

const API_BASE_URL = 'http://localhost:8080'; // Base URL for your API

const API_ROUTES = {
  getQuestionnaires: `${API_BASE_URL}/questionnaires`,
  
  createQuestionnaire: `${API_BASE_URL}/questionnaires`,
  validateQuestionnaire: (id,state) => // true or false state
    `${API_BASE_URL}/questionnaires/${id}/validation=${state}`,
  
  publishQuestionnaire:  (id, state) => // true or false state
    `${API_BASE_URL}/questionnaires/${id}/publication=${state}`,
  
  saveQuestionnaireSection: (questionnaireId) => 
    `${API_BASE_URL}/questionnaires/${questionnaireId}/sections`,

  removeQuesionnaireSection: (questionnaireId, sectionTitle)=>
    `${API_BASE_URL}/questionnaires/${questionnaireId}/sections/${sectionTitle}`
};

export default API_ROUTES;