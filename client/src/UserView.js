import React, { useEffect, useState } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import UsersTable from "./Users/UsersTable";
import { Button, Drawer, FloatButton, Modal, Space } from "antd";
import UserForm from "./Users/UserForm";
import { UserAddOutlined, SaveOutlined } from "@ant-design/icons";
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from "./gql/Users";
import UserCoursesForm from "./UserCoursesForm";
import {
  CREATE_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
} from "./gql/CourseResults";

export const UserView = () => {
  const {
    loading,
    error,
    data,
    refetch: refetchUsers,
  } = useQuery(GET_USERS, {});

  const handleError = (err) => {
    console.log(err);
  };
  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: refetchUsers,
    onError: handleError,
  });
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: refetchUsers,
    onError: handleError,
  });
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: refetchUsers,
    onError: handleError,
  });

  const [createCourse] = useMutation(CREATE_COURSE, {
    onCompleted: refetchUsers,
    onError: handleError,
  });
  const [updateCourse] = useMutation(UPDATE_COURSE, {
    onCompleted: refetchUsers,
    onError: handleError,
  });
  const [deleteCourse] = useMutation(DELETE_COURSE, {
    onCompleted: refetchUsers,
    onError: handleError,
  });

  const { users = [] } = data || {};
  const [currentUser, setCurrentUser] = useState(null);
  const [mode, setMode] = useState(); // mode: view or edit

  useEffect(() => {
    if (!users.length) return;
    if (!currentUser?.id) return;
    setCurrentUser((user) => users.find((u) => u.id === user.id));
  }, [users]);

  const isUserModalOpen = Boolean(currentUser);
  const closeDrawer = () => {
    setCurrentUser(null);
  };
  const setCurrentUserById = (id) => {
    const user = users.find((u) => u.id === id);
    setCurrentUser(user);
  };
  // Handling User logic
  const handleUserView = (id) => {
    setCurrentUserById(id);
    setMode("View");
  };
  const handleUserEdit = (id) => {
    setCurrentUserById(id);
    setMode("Edit");
  };
  const handleUserDelete = (id) => {
    deleteUser({
      variables: {
        id,
      },
    });
  };
  const handleUserCreate = () => {
    setCurrentUser({});
    setMode("Create");
  };
  const handleUserSubmit = (user) => {
    if (mode == "Create") {
      createUser({
        variables: {
          ...user,
        },
      });
      closeDrawer();
    } else {
      updateUser({
        variables: {
          id: currentUser.id,
          ...user,
        },
      });
    }
    console.log(user);
  };

  // Handling course logic
  const handleCourseSubmit = (course) => {
    if (!course || !currentUser) return;
    course.score = Number(course.score);
    if (!course.id) {
      createCourse({
        variables: {
          ...course,
          learnerId: currentUser?.id,
        },
      });
    } else {
      updateCourse({
        variables: {
          ...course,
          learnerId: currentUser?.id,
        },
      });
    }
  };
  const handleCourseDelete = (id) => {
    deleteCourse({
      variables: {
        id,
      },
    });
  };
  
  const drawerTitle = `${mode} a User`;

  if (error) return <p>Error!</p>;
  return (
    <div>
      <h1>User View</h1>
      {loading && <p>Loading...</p>}
      <UsersTable
        users={users}
        onView={handleUserView}
        onEdit={handleUserEdit}
        onDelete={handleUserDelete}
      />
      <FloatButton
        icon={<UserAddOutlined />}
        tooltip="Create a User"
        type="primary"
        onClick={handleUserCreate}
      />
      <Drawer
        open={isUserModalOpen}
        title={drawerTitle}
        placement="right"
        width={480}
        onClose={closeDrawer}
      >
        {currentUser && (
          <>
            <UserCoursesForm
              user={currentUser}
              mode={mode}
              onSubmit={handleUserSubmit}
              onCourseSubmit={handleCourseSubmit}
              onCourseDelete={handleCourseDelete}
            />
          </>
        )}
      </Drawer>
    </div>
  );
};
