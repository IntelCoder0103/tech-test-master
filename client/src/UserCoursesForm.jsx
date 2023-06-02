import React, { useEffect, useState } from "react";
import { Button, Divider, Drawer, Form, Input, Typography } from "antd";
import CourseResultsTable from "./CourseResults/CourseResultsTable";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import CourseResultForm from "./CourseResults/CourseResultForm";
import UserForm from "./Users/UserForm";

export default function UserCoursesForm(props) {
  const { user, mode, onSubmit, onCourseDelete, onCourseSubmit } = props;
  const [form] = Form.useForm();
  const { courseResults = [] } = user || {};
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  const handleCourseEdit = (id) => {
    const course = courseResults.find((c) => c.id === id);
    setCurrentCourse(course);
  };
  const handleCourseCreate = () => {
    setCurrentCourse({});
  };
  const handleSubmit = (data) => {
    onCourseSubmit && onCourseSubmit({
      id: currentCourse?.id,
      ...data
    });
    closeDrawer();
  };

  const drawerTitle = currentCourse?.id ? "Edit a course" : "Create a course";
  const isDrawerOpen = Boolean(currentCourse);
  const closeDrawer = () => setCurrentCourse(null);
  return (
    <>
      <UserForm {...{ user, mode, onSubmit }} />
      {/* Not shows courses results in create mode */}
      {mode !== "Create" && (
        <>
          <Divider />
          <Typography.Title level={4}>Course Results</Typography.Title>
          
          <CourseResultsTable
            courses={courseResults}
            onEdit={handleCourseEdit}
            onDelete={onCourseDelete}
          />
          <Drawer open={isDrawerOpen} onClose={closeDrawer} title={drawerTitle}>
            <CourseResultForm course={currentCourse} onSubmit={handleSubmit} />
          </Drawer>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={handleCourseCreate}
          >
            Add
          </Button>
        </>
      )}
    </>
  );
}
