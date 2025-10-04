import { Request, Response } from "express";
import {
  getDashboardCounts,
  getOrderStatusCounts,
  getRecentOrdersData,
} from "../models/dashboardModel";

const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Inside");

  try {
    console.log("Inside try as well");
    const result = await getDashboardCounts();
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const getOrderStatusSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getOrderStatusCounts();

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const getRecentOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getRecentOrdersData();
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export { getDashboardMetrics, getOrderStatusSummary, getRecentOrders };
