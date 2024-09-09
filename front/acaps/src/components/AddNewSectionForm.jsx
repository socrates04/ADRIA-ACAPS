import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import API_ROUTES from '../apiRoutes';

const AddNewSectionForm = ({ questionnaireId, onSectionAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.put(API_ROUTES.saveQuestionnaireSection(questionnaireId), values);
      if(response.status == 200) message.success('Section added successfully!');
      form.resetFields();
      onSectionAdded(response.data); // Notify parent component to refresh the section list
    } catch (error) {
      message.error('Failed to add section. Please try again.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: 400 }}
    >
      <Form.Item
        name="title"
        label="Section Title"
        rules={[{ required: true, message: 'Please enter the section title' }]}
      >
        <Input placeholder="Enter section title" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Section
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewSectionForm;