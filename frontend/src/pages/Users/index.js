import { useEffect, useState } from "react";
import useFetch from "use-http";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { Table, Tag } from "antd";
import config from "../../config";

dayjs.extend(dayOfYear);

const Users = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
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
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Aadhar No",
      dataIndex: "aadharNo",
      key: "aadharNo",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => `${dayjs(value).dayOfYear(365)}`,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (value) => `${dayjs(value).dayOfYear(365)}`,
    },
  ];

  const [users, setUsers] = useState([]);
  const { get, post, response, loading, error } = useFetch(
    `${config.apiUrl}/user`
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await get("/");
      setUsers(usersData.users);
    };

    fetchUsers();
  }, []);

  console.log("users: ", users);

  return (
    <div>
      <p>Users ...</p>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default Users;
