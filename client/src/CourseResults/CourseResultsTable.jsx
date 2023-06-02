import React from "react";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
export default function CourseResultsTable(props) {
  const { courses, onEdit, onDelete } = props;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Action",
      key: "action",
      render: (_, { id }) => (
        <>
          <Button
            type="ghost"
            icon={<EditOutlined />}
            onClick={() => onEdit(id)}
          ></Button>
          <Popconfirm
            title="Delete the course"
            description="Are you sure to delete this course?"
            onConfirm={() => onDelete(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="ghost"
              icon={<DeleteOutlined />}
            ></Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return <Table dataSource={courses} columns={columns} />;
}
