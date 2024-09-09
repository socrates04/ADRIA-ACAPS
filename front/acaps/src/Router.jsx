import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateQuestionnaire from './pages/admin/CreateQuestionnaire';
import EditQuestionnaire from './pages/admin/EditQuestionnaire';
import ValidateQuestionnaires from './pages/admin/ValidateQuestionnaires';
import QuestionnaireList from './pages/admin/QuestionnaireList';
import LoginForm from "./pages/LoginForm";
import ProtectedRoute from './components/ProtectedRoute';
import AdminSectionEditing from "./components/AdminSectionEditing";
import QuestionnaireInfo from "./components/QuestionnaireInfo";
import QuestionnaireTree from "./components/QuestionnaireTree";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "questionnaire",
        element: <QuestionnaireList />,
      },
      {
        path: "questionnaire/create",
        element: <CreateQuestionnaire />,
      },
      {
        path: "questionnaire/:id",
        element: <EditQuestionnaire />,
        children:[
          {
            index: true,
            element: <QuestionnaireInfo />
          },
          {
            path: "sections",
            element: <AdminSectionEditing />
          },
          {
            path:"sections/preview",
            element: <QuestionnaireTree/>
          }
        ]
      },
    ],
  },
  {
    path: "/superuser/validate",
    element: (
      <ProtectedRoute role="superuser">
        <ValidateQuestionnaires />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <LoginForm />,
  },
]);
export default router;