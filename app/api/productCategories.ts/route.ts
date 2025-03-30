import type { NextApiRequest, NextApiResponse } from "next";
import { getProductCategories } from "@/app/services/productCategory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const categories = await getProductCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product categories" });
  }
}
