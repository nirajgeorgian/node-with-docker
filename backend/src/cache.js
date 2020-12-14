import Aerospike from "aerospike";
import config from "./config";

const aerospikeConfig = {
  hosts: config.aerospikeHosts,
};
export const client = Aerospike.client(aerospikeConfig);

const aerospikeDBParams = {
  defaultNamespace: "dododuck",
  defaultSet: "dododuck",
};

// Establish connection to the cluster
export const connect = function (callback) {
  client.connect(callback);
};

// Write a record
export const writeRecord = async (k, v) => {
  // let key = new Aerospike.Key(
  //   aerospikeDBParams.defaultNamespace,
  //   aerospikeDBParams.defaultSet,
  //   k
  // );
  const key = new Aerospike.Key("test", "demo", "demo");
  console.log("client: ", client);
  await client.put(key, v);
  //   , function (error) {
  //   // Check for errors
  //   if (error) {
  //     // An error occurred
  //     return callback(error);
  //   } else {
  //     return callback(null, "ok");
  //   }
  // });
};

// Read a record
export const readRecord = async (k) => {
  const key = new Aerospike.Key(
    aerospikeDBParams.defaultNamespace,
    aerospikeDBParams.defaultSet,
    k
  );
  console.log("client: ", client);
  try {
    const data = await client.get(key);
    return data;
  } catch (err) {
    console.error("error in cache put data: ", err.message || err);
  }
  // , function (error, record) {
  //   // Check for errors
  //   if (error) {
  //     // An error occurred
  //     return callback(error);
  //   } else {
  //     const bins = record.bins;
  //     return callback(null, k + " " + bins);
  //   }
  // });
};
