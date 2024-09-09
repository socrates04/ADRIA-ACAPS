import { Table, Space, Tag, Input, Button } from "antd";
import {  PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import API_ROUTES from "../../apiRoutes";
import { useState, useEffect } from "react";
import questionnaires from '../../Data/mocQuestionnaireTable'
import { Link } from "react-router-dom";
import CreateQuestionnaireModal from "../../components/CreateQuestionnaireModal";

const {Search} = Input;

const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Creation Date",
      dataIndex: "creationDate",
      key: "creationDate",
    },
    {
      title: "Number of Entries",
      dataIndex: "nbrSubmissions",
      key: "nbrSubmissions",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_,record)=>{
        let color= "gray";
        switch (record.status) {
            case "DISTRIBUTED":
                color="green";
                break;
            case "VALIDATED":
                color="volcano"
                break;
        }
        // if(record.distributed==="true") return(<Tag color="green">DISRTIBUTED</Tag>);
        // else if (record.validated==="true") return(<Tag color="Volcano">VALIDATED</Tag>);
        // else 
        return(<Tag color={color}>DRAFT</Tag>);
      }
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link>Stats</Link>
          <Link to={`${record.key}`}>Manage</Link>
        </Space>
      ),
    },
  ];

const QuestionnaireList = ()=>{

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlModalClosure = () =>setIsModalOpen(false);

    const toggleLoading = ()=>{setLoading(!loading);}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ROUTES.getQuestionnaires);
        const questionnaires = response.data.map(q => ({
          key: q.id,
          title: q.title,
          creationDate: new Date(q.creationDate).toLocaleDateString(),
          nbrSubmissions: q.nbrSubmissions,
          status: q.distributed ? 'DISTRIBUTED' : (q.validated ? 'VALIDATED':'DREAFT'),
        }));
        setData(questionnaires);
        toggleLoading();
      } catch (error) {
        console.error('Error fetching data:', error);
        // tempo
        const tmpData = questionnaires.map(q => ({
            key: q.id, // Unique key for each row
            title: q.title,
            creationDate: new Date(q.creationDate).toLocaleDateString(),
            nbrSubmissions: q.nbrSubmissions,
            status: q.distributed ? 'DISTRIBUTED' : (q.validated ? 'VALIDATED':'DREAFT'),
          }));
        setData(tmpData);
        toggleLoading();
      }
    };

    fetchData();
  }, []);

    const onSearch = (text)=>{
        console.log(text);
    };

    return (
      <Space className=" w-full p-5" direction="vertical" size="large" >

        <CreateQuestionnaireModal isOpen={isModalOpen} onClose={handlModalClosure} />

        <Space size="large" direction="horizontal" align="end" className="flex flex-row justify-between">
          <Search
            className="basis-2/3 "
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />

          <Button
            //className="basis-1/3"
            type="dashed"
            onClick={()=>setIsModalOpen(true)}
            style={{
              marginTop: "20px",
              padding:"3"
            }}
            icon={<PlusOutlined />}
          >
            new
          </Button>
        </Space>
        <div className="">
          <Table 
            columns={columns} 
            dataSource={data}
            scroll={{
                y: 240,
              }}
            pagination={{
                pageSize: 7,
            }}
            loading={loading}
            bordered
            size="middle"
          />
        </div>
        </Space>
    );
};
export default QuestionnaireList;