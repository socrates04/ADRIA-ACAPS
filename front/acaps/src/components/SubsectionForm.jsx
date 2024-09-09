import { Form, Input, Button, Space, Select, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

const handleFinish = (values)=> console.log(values)

const SectionForm = ({ options,initialValues, onFinish }) => {
  return (
    <Form
      name="sectionForm"
      //initialValues={initialValues}
      onFinish={handleFinish}
      autoComplete="off"
    >
      <Form.Item
        name="triggerAnswer"
        label="select an answer as a trigger"
        rules={[{ required: true, message: 'A subsection must have a trigger' }]}
      >
        <Select>
            {options.map((op)=>{
                <Option value={op}>{op}</Option>
            })}
        </Select>
      </Form.Item>

      <Form.List name="questions">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Card 
                key={key} style={{ marginBottom: 8 }}
                title={`Question ${key + 1}`}
                extra={
                    <CloseOutlined
                        onClick={() => {
                        remove(name);
                        }}
                    />
                }
                size='small'
                >
                <Space align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'questionText']}
                    fieldKey={[fieldKey, 'questionText']}
                    rules={[{ required: true, message: 'Missing question text' }]}
                  >
                    <Input placeholder="Question Text" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'questionType']}
                    fieldKey={[fieldKey, 'questionType']}
                    rules={[{ required: true, message: 'Missing question type' }]}
                  >
                    <Select placeholder="Select a question type">
                      <Option value="UNIQUECHOICE">Unique Choice</Option>
                      <Option value="MULTICHOICE">Multiple Choice</Option>
                      <Option value="BOOLEAN">Boolean</Option>
                    </Select>
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>

                {/* Options Form.List */}
                <Form.List name={[name, 'options']}>
                  {(optionFields, { add: addOption, remove: removeOption }) => (
                    <>
                      {optionFields.map(({ key: optionKey, name: optionName, fieldKey: optionFieldKey, ...optionRestField }) => (
                        <Space key={optionKey} align="baseline" style={{ marginBottom: 8 }}>
                          <Form.Item
                            {...optionRestField}
                            name={[optionName, 'name']}
                            fieldKey={[optionFieldKey, 'name']}
                            rules={[{ required: true, message: 'Missing option name' }]}
                          >
                            <Input placeholder="Option Name" />
                          </Form.Item>

                          <Form.Item
                            {...optionRestField}
                            name={[optionName, 'grade']}
                            fieldKey={[optionFieldKey, 'grade']}
                            rules={[{ required: true, message: 'Missing option grade' }]}
                          >
                            <Input placeholder="Option Grade" type="number" />
                          </Form.Item>

                          <MinusCircleOutlined onClick={() => removeOption(optionName)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => addOption()} block icon={<PlusOutlined />}>
                          Add Option
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Question
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Section
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SectionForm;
