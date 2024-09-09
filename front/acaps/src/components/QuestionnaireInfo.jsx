import { useEffect, useState } from 'react';
import { Badge, Button, Descriptions, Space, theme, Flex, Spin } from 'antd';
import { useOutletContext } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import questionnaires from '../Data/mocQuestionnaireTable';

const constructDetailsItems = (questionnaireDetails) => [
    {
      key: "title",
      label: "Title",
      children: questionnaireDetails.title,
    },
    {
      key: "creationDate",
      label: "Creation Date",
      children: new Date(questionnaireDetails.creationDate).toLocaleString(),
    },
    {
      key: "validated",
      label: "Validated",
      children: questionnaireDetails.validated ? <Badge status='success' text="yes"/> : <Badge status='error' text="No"/>,
    },
    {
      key: "validationDate",
      label: "Validation Date",
      children: questionnaireDetails.validationDate
        ? new Date(questionnaireDetails.validationDate).toLocaleString()
        : "N/A",
    },
    {
      key: "distributed",
      label: "Distributed",
      children: questionnaireDetails.distributed ? <Badge status='success' text="yes"/> : <Badge status='error' text="No"/>,
    },
    {
      key: "validationScore",
      label: "Validation Score",
      children: questionnaireDetails.validationScore,
    },
    {
      key: "nbrSubmissions",
      label: "Number of Submissions",
      children: questionnaireDetails.nbrSubmissions,
    },
    {
      key: "lastUpdated",
      label: "Last Updated",
      children: new Date(questionnaireDetails.lastUpdated).toLocaleString(),
    },
    {
      key: "validatorName",
      label: "Validator Name",
      children: questionnaireDetails.validatorName,
    },
    {
      key: "creatorName",
      label: "Creator Name",
      children: questionnaireDetails.creatorName,
    },
    {
      key: "numberOfSections",
      label: "Number of Sections",
      children: questionnaireDetails.nbrSections,
    },
];

const QuestionnaireInfo = () => {
  const { token } = theme.useToken();
  
  const [questionnaireDetailsItems, setQuestionnaireDetailsItems ] = useState([]);

    const {
        questionnaireDetails,
        validateQuestionnaire, validationLoading,
        questionnairePublication, publishingLoading,
    } = useOutletContext();

    useEffect(()=>{
        if (questionnaireDetails) setQuestionnaireDetailsItems(constructDetailsItems(questionnaireDetails));
    },[questionnaireDetails]);

  return (
    <Space
      direction="vertical"
      style={{
        padding: "10px",
        background: token.colorBgContainer,
        height: "100%",
      }}
    >
      {questionnaireDetails ? (
        <>
          <Descriptions
            bordered
            title="Questionnaire details"
            size="small"
            extra={<Button type="primary">Edit</Button>}
            items={questionnaireDetailsItems}
          />
          <Space>
            <Button
              type="primary"
              danger
              onClick={questionnairePublication}
              loading={publishingLoading}
            >
              {questionnaireDetails.distributed ? "Uppublish" : "Publish"}
            </Button>


            <Button
              type="primary"
              style={{ background: token.colorSuccess }}
              onClick={validateQuestionnaire}
              loading={validationLoading}
            >
              {questionnaireDetails.validated? "Invalidate": "validate" }
            </Button>

          </Space>
        </>
      ) : (
        <Flex align="center" gap="middle" style={{ height: "100%" }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </Flex>
      )}
    </Space>
  );
};
export default QuestionnaireInfo;