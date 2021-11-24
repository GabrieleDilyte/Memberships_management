import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const MONGO_CONNECTION_STRING = "mongodb://127.0.0.1:27017/membershipDB";

const mongoClient = new MongoClient(MONGO_CONNECTION_STRING);

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/memberships", async (req, res) => {
  const connection = await mongoClient.connect();
  const data = await connection
    .db("membershipsDB")
    .collection("services")
    .find({})
    .toArray();

  await connection.close();
  res.send(data);
});

app.post("/memberships", async (req, res) => {
  const { id, name, price, description } = req.body;
  const connection = await mongoClient.connect();
  const data = await connection
    .db("membershipsDB")
    .collection("services")
    .insertOne({
      id,
      name,
      price,
      description,
    });

  await connection.close();
  res.send(data);
});

app.delete("/memberships/:id", async (req, res) => {
  const connection = await mongoClient.connect();
  const membId = Number(req.params.id);

  const data = await connection
    .db("membershipsDB")
    .collection("services")
    .deleteOne({
      id: membId,
    });

  await connection.close();
  res.send(data);
});

app.get("/users", async (req, res) => {
  let sortName = 1;

  if (req.query.sort) {
    sortName = req.query.sort === "ASC" ? 1 : -1;
  }

  const connection = await mongoClient.connect();
  const data = await connection
    .db("membershipsDB")
    .collection("users")
    .aggregate([
      {
        $lookup: {
          from: "services",
          localField: "service_id",
          foreignField: "id",
          as: "membershipName",
        },
      },
      {
        $set: {
          membershipName: { $arrayElemAt: ["$membershipName.name", 0] },
        },
      },
    ])
    .sort({ name: sortName })
    .toArray();

  await connection.close();
  res.send(data);
});

app.post("/users", async (req, res) => {
  const { id, name, surname, email, service_id } = req.body;
  const connection = await mongoClient.connect();
  const data = await connection
    .db("membershipsDB")
    .collection("users")
    .insertOne({
      id,
      name,
      surname,
      email,
      service_id,
    });

  await connection.close();
  res.send(data);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
