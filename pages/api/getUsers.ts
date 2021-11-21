import Chance from "chance";
import { NextApiRequest, NextApiResponse } from "next";

export interface User {
  id: number;
  name: string;
  age: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const datas = [];
  const chance = new Chance(12345);

  for (let i = 0; i < 100000; i++) {
    datas.push({ id: i + 1, name: chance.name(), age: chance.age() });
  }

  res.status(200).json(datas);
}
