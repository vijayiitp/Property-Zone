import jwt from "jsonwebtoken";
import  VisitRequest from "../models/VisitRequest.js";
export const getPendingRequests = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const requests = await VisitRequest.find({
      sellerId: userId,
      status: { $in: ["pending", "accepted"] },
    }).populate("buyerId propertyId");
    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    res
      .status(500)
      .json({ message: "Error fetching requests", error: error.message });
  }
};

export const updateVisitRequestStatus = async (req, res) => {
  try {
    console.log("req.user is:", req.user);
    const { id, decision } = req.params;
    const validDecisions = ['accepted', 'rejected'];

    if (!validDecisions.includes(decision)) {
      return res.status(400).json({ message: "Invalid decision value" });
    }

    const request = await VisitRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Visit request not found" });
    }

if (request.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    request.status = decision;
    await request.save();

    res.status(200).json({ message: `Request ${decision}` });
  } catch (error) {
    console.error("Error updating visit request status:", error);
    res.status(500).json({ message: "Error updating visit request", error: error.message });
  }
};