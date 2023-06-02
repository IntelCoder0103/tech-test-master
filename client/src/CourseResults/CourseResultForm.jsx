import React, { useEffect } from "react";
import { Button, Divider, Form, Input, Typography } from "antd";
import CourseResultsTable from "../CourseResults/CourseResultsTable";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
export default function CourseResultForm(props) {
  const { course, onSubmit } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields(['name', 'score']);
    form.setFieldsValue(course);
    
  }, [course]);

  return (
    <>
      <Form
        labelCol={{ span: 6 }}
        labelAlign="left"
        wrapperCol={{ span: 12 }}
        style={{
          maxWidth: 480,
        }}
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item label="Name" name="name">
          <Input required placeholder="Course Name" />
        </Form.Item>
        <Form.Item label="Score" name="score">
          <Input required placeholder="100" type="number" />
        </Form.Item>

        <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
          Save
        </Button>
      </Form>
    </>
  );
}
