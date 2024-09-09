import { Button, Card, Form, Input, Space, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';


const QuestionForm = ()=>{
    const form = Form.useForm();
    return(
        <Card
            size='large'
            title={`Item ${field.name + 1}`}
            key={field.key}
            extra={
                <CloseOutlined
                  onClick={() => {
                    remove(field.name);
                  }}
                />
            }

        >
            {fields.map((field)=>{
                <Form.Item
                    
                >

                </Form.Item>
            })}
        </Card>
);}