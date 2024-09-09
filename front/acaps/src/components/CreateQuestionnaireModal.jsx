import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router
import API_ROUTES from '../apiRoutes';
import { useState } from 'react';

const CreateQuestionnaireModal = ({ isOpen, onClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);

      // Send the data to the backend
      const response = await axios.post(API_ROUTES.createQuestionnaire, values);

      // Check if the response indicates success before navigating
      if (response.status === 201) {
        // Assuming the backend returns status 201 for a successful creation
        //message.success("Questionnaire created successfully!");
        form.resetFields();
        onClose();

        // Navigate to the editing page after successful creation
        navigate(`/admin/questionnaire/${response.data.id}`);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      message.error("Failed to create questionnaire. Please try again.");
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      title="Create New Questionnaire"
      onCancel={onClose}
      //onOk={handleCreate}
      confirmLoading={confirmLoading}
      footer={[
        <Button key="back" onClick={()=>{form.resetFields();onClose();}} disabled={confirmLoading}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={confirmLoading} onClick={handleCreate}>
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="create_questionnaire_form">
        <Form.Item
          name="title"
          label="Questionnaire Title"
          rules={[{ required: true, message: 'Please enter the questionnaire title' }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateQuestionnaireModal;