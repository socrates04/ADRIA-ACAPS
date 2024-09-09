import { Collapse, Form, Input, Button, Space, InputNumber, Select, Checkbox, message } from 'antd';
import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import API_ROUTES from '../apiRoutes';
import { useEffect, useState } from 'react';

const { Panel } = Collapse;  
const {Option}= Select;

const initialValuesTempo = {
    title: "Moc section",
    validationScore: 5,
    questions:[
        { 
            number:8,
            text: "What is life?",
            type: "UNIQUECHOICE",
            required: true,
            choices:[]
        },
        { 
            number: 2,
            text: "What did i do?",
            type: "UNIQUECHOICE",
            required: false,
            choices:[]
        },
    ]
};

const selectQuestionType = ()=>(
    <Select placeholder="Select a question type">
        <Option value="UNIQUECHOICE">Unique Choice</Option>
        <Option value="MULTICHOICE">Multiple Choice</Option>
        <Option value="BOOLEAN">Boolean</Option>                              
    </Select>
)

const SectionForm = ({onSectionAdded,questionnaireId,section})=>{

  const [form] = Form.useForm();
  const [loading, setLoading] = useState();

  useEffect(()=>{
    console.log(`section changed to ${section.title}`);
    form.setFieldValue(section);
  },[form,section]);

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
          key={section?.title}
          name='section'
          onFinish={(values)=>handleSubmit(values)}
          autoComplete='off'
          initialValues={section}
        >
        <Space direction='vertical' style={{width:'100%'}} >

          <Form.Item
            name="title"
            label="Section Title"
            rules={[{ required: true, message: 'Please input the section title!' }]}
          >
            <Input placeholder="Enter section title" />
          </Form.Item>

          <Form.Item
              name="validationScore"
              label="Validation Score"
              rules={[{ required: true, message: 'Please input the minimum score to validate this section!' }]}
          >
              <InputNumber placeholder="score to validate section" />
          </Form.Item>

          <Form.List name="questions" direction="vertical">
              {(fields, { add, remove }) => {
                  
                  return (
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Collapse accordion>
                        {fields.map((field) => (
                          <Panel
                            header={`Question ${field.name + 1}`}
                            key={field.key}
                            extra={
                              <CloseCircleOutlined
                                onClick={() => remove(field.name)}
                              />
                            }
                          >
                            <Space align="baseline">
                              
                              <Form.Item
                                {...field}
                                name={[field.name, "number"]}
                                key={[field.key, "number"]}
                                initialValue={field.name+1}
                                hidden={true} 
                              >
                                <InputNumber />
                              </Form.Item>
                              <Form.Item
                                {...field}
                                label="Question Text"
                                name={[field.name, "text"]}
                                key={[field.key, "text"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input the question!",
                                  },
                                ]}
                              >
                                <Input placeholder="Enter question" />
                              </Form.Item>
                              {/* Adding apotions */}
                              <Form.Item
                                {...field}
                                label="Type"
                                name={[field.name, "type"]}
                                key={[field.key, "type"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing question type",
                                  },
                                ]}
                              >
                                {selectQuestionType()}
                              </Form.Item>
                            </Space>
                            <Form.Item
                              {...field}
                              label="required"
                              name={[field.name, "required"]}
                              key={[field.key, "required"]}
                              valuePropName="checked"
                            >
                              <Checkbox defaultChecked />
                            </Form.Item>
                              
                            <Form.List name={[field.name,'choices']}>
                              {(chioceFields, {add: addChoice, remove: removeChoice} )=>(
                                <Space style={{width:'100%'}} direction='vertical'>
                                <Collapse accordion size='small' >
                                  {chioceFields.map((chioceField)=>(
                                    <Panel 
                                      header={`Option ${chioceField.name + 1}`}
                                      key={chioceField.key}
                                      extra={
                                        <CloseCircleOutlined
                                          onClick={() => removeChoice(chioceField.name)}
                                        />
                                      }
                                    >
                                      <Form.Item
                                        {...chioceField}
                                        label="Name"
                                        name={[chioceField.name,"name"]}
                                        key={[chioceField.key,'name']}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Missing option name",
                                          },
                                        ]}
                                      >
                                        <Input placeholder='Name this option' size='small'/>
                                      </Form.Item>
                                      
                                      <Form.Item
                                        {...chioceField}
                                        label="Grade"
                                        name={[chioceField.name,"grade"]}
                                        key={[chioceField.key,'grade']}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Missing option grade",
                                          },
                                        ]}
                                      >
                                        <InputNumber placeholder='the grade for the option' size='small' />
                                      </Form.Item>
                                      
                                    </Panel>
                                  )
                                  )}
                                  </Collapse>
                                  <Button 
                                  type='dashed' 
                                  shape='circle' 
                                  icon={<PlusCircleOutlined />}
                                  danger
                                  onClick={()=>addChoice()}
                                  />
                                </Space>
                                )
                              }
                            </Form.List>
                            
                            <Button onClick={() => remove(field.name)}>
                              Remove Question
                            </Button>
                          </Panel>
                        ))}
                      </Collapse>
                      <Button type='dashed' icon={<PlusCircleOutlined/>} onClick={() => add()}>Add Question</Button>
                    </Space>
                  );}}
          </Form.List>

          <Form.Item>
              <Button htmlType='submit' type='primary' loading={loading}> Save </Button>
          </Form.Item>

        </Space>
      </Form>
    );
}

export default SectionForm;