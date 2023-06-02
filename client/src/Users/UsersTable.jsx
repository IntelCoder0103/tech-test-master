import React from "react";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
export default function UsersTable(props) {
  const { users, onView, onEdit, onDelete } = props;
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Courses",
      key: "courses",
      dataIndex: "courseResults",
      render: (_, { courseResults }) => (
        <>
          {courseResults.slice(0, 3).map((c, index) => (
            <Tag color="green" key={index}>
              {c.name}
            </Tag>
          ))}
          {courseResults.length > 3 &&
            ` and ${courseResults.length - 3} more...`}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, { id }) => (
        <>
          <Button type="ghost" onClick={() => onView(id)} icon={<EyeOutlined />}>
          </Button>
          <Button type="ghost" onClick={() => onEdit(id)} icon={<EditOutlined />}>
          </Button>
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={() => onDelete(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="ghost" icon={<DeleteOutlined/>}>
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  
  return <Table dataSource={users} columns={columns} />;
}
