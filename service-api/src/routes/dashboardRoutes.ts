import { Router } from "express";
import {
  getDashboardMetrics,
  getOrderStatusSummary,
  getRecentOrders,
} from "../controllers/dashboardController";

const router = Router();
console.log("calling here routes atleast");

router.get("/metrics", getDashboardMetrics);
// router.get(
//   "/metrics",
//   (req, res, next) => {
//     console.log("🎯 /metrics route hit!"); // ✅ Add this middleware
//     next();
//   },
//   getDashboardMetrics
// );

router.get("/test", (req, res) => {
  console.log("🧪 Dashboard test route hit!");
  res.json({
    message: "Dashboard routes working!",
    timestamp: new Date().toISOString(),
  });
});

router.get("/status", getOrderStatusSummary);
router.get("/recent", getRecentOrders);

export default router;
