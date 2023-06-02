import React, { useEffect, useState } from "react";
import { Button, Divider, Drawer, Form, Input, Typography } from "antd";
import CourseResultsTable from "../CourseResults/CourseResultsTable";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import CourseResultForm from "../CourseResults/CourseResultForm";
export default function UserForm(props) {
  const { user, onSubmit, mode } = props;
  const [form] = Form.useForm();

  const readOnly = mode == "View";

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  return (
    <>
      <Form
        labelCol={{ span: 6 }}
        labelAlign="left"
        wrapperCol={{ span: 12 }}
        style={{
          maxWidth: 600,
        }}
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item label="First Name" name="firstName">
          <Input readOnly={readOnly} required placeholder="John" />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input readOnly={readOnly} required placeholder="Doe" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input
            readOnly={readOnly}
            required
            placeholder="youremail@example.com"
            type="email"
          />
        </Form.Item>

        {!readOnly && (
          <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
            Save
          </Button>
        )}
      </Form>
    </>
  );
}
