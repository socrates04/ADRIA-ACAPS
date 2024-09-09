import { Space, Spin, Tree } from "antd";
import { useOutletContext } from "react-router-dom";

const QuestionnaireTree = () => {
  const { questionnaire } = useOutletContext();

  // Transform the questionnaire data into tree data
  const getTreeData = () => {
    const sections = questionnaire?.sections || [];

    return sections.map((section) => ({
      title: section.title,
      key: section.title, // Make sure section.id is unique
      children: section.questions.map((question) => ({
        title: question.text, // Assuming question.text contains the question text
        key: `${section.title}-${question.number}`, // Ensure unique key for questions
        children: question.choices.map((choice, index) => ({
          title: `${choice.name} (${choice.grade})`, // Assuming choice is a simple string
          key: `${section.title}-${question.number}-${index}`, // Unique key for choices
        })),
      })),
    }));
  };

  return (
    <Space direction="vertical">
      {questionnaire ? (
        <Tree treeData={getTreeData()} defaultExpandAll showLine />
      ) : (
        <Spin size="large"/>
      )}
    </Space>
  );
};

export default QuestionnaireTree;
