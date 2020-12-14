import Aerospike from "aerospike";
import { User } from "../models";
import { client } from "../cache";

export const userList = async (req, res, next) => {
  const key = new Aerospike.Key("test", "demo", "users");
  try {
    const cachedUsers = await client.get(key);
    if (cachedUsers) {
      const { users } = cachedUsers.bins;
      return res.status(200).send({ status: true, users });
    }
  } catch (err) {
    const rawUsers = await User.findAll({});
    const users = rawUsers.map(({ dataValues }) => {
      delete dataValues.password;
      return {
        ...dataValues,
        createdAt: dataValues.createdAt.toString(),
        updatedAt: dataValues.updatedAt.toString(),
      };
    });
    await client.put(key, { users });
    return res.status(200).send({ status: true, users });
  }
};

export const singleUser = async (req, res, next) => {
  const { id } = req.params;
  const key = new Aerospike.Key("test", "demo", id.toString());
  try {
    const cachedUser = await client.get(key);
    if (cachedUser) {
      const { user } = cachedUsers.bins;
      return res.status(200).send({ status: true, user });
    }
  } catch (err) {
    const user = await User.findByPk(id);
    if (user === null) {
      return res.status(404).send({
        status: false,
        message: `no user found with id: ${id}`,
      });
    }

    await client.put(key, { user });
    return res.status(200).send({ status: true, user });
  }
};
