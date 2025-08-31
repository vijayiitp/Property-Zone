// controllers/propertyController.js
import { Property } from "../models/Property.js";
import  VisitRequest from "../models/VisitRequest.js";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import { uploadFile , deleteFile } from "../utility/awssetup.js"; // Adjust the import path as needed

const allProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({
      success: true,
      products: properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
    });
  }
};

// const newProperty = async (req, res) => {
//   try {
//     const { locality, image, price, city, squareFeet, name } = req.body;
//     console.log(req.body);
//     const token = req.cookies.token;

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.userId;
//     const newProperty = new Property({
//       locality,
//       image,
//       price,
//       city,
//       squareFeet,
//       name,
//       userId: userId, // decoded from token via verifyToken middleware
//     });
//     // console.log(newProperty);
//     await newProperty.save();
//     res.status(201).json({ success: true, property: newProperty });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


const newProperty = async (req, res) => {
  try {
    const { locality, price, city, squareFeet, name } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // ✅ Handle file upload (assuming you're using multer)
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Local file path (multer saves temporarily in /uploads)
    const localFilePath = req.file.path;
    const fileExt = path.extname(req.file.originalname);
    const s3Key = `properties/${Date.now()}_${req.file.originalname}`;

    // Upload to S3
    const s3Url = await uploadFile(localFilePath, s3Key, req.file.mimetype);

    // Remove local file after upload
    fs.unlinkSync(localFilePath);

    // Save to DB
    const newProperty = new Property({
      locality,
      image: s3Url, // store S3 URL
      price,
      city,
      squareFeet,
      name,
      userId: userId,
    });

    await newProperty.save();
    res.status(201).json({ success: true, property: newProperty });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const Request = async (req, res) => {
  try {
    const { buyerId, sellerId, propertyId, message } = req.body;
    console.log(req.body);

    // Check if a request already exists with same buyer, seller, and property
    const existingRequest = await VisitRequest.findOne({
      buyerId,
      sellerId,
      propertyId,
      status: { $in: ["pending", "accepted"] }, // Optional: skip "rejected"
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Visit request already sent or accepted." });
    }

    const request = new VisitRequest({
      buyerId,
      sellerId,
      propertyId,
      message,
    });

    await request.save();
    res.status(201).json(request);
  } catch (error) {
    console.error("Error creating visit request:", error);
    res.status(500).json({
      message: "Failed to create visit request",
      error: error.message,
    });
  }
};

const DeleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    const key = property.image.split('/').pop(); // Extract the S3 key from the URL
    // console.log("S3 Key to delete:", key);
    await deleteFile(key);
    await property.deleteOne();

    res.status(200).json({ message: "Property and image deleted successfully" });

  } catch (error) {
    console.error("Delete property error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { allProperties, newProperty , Request , DeleteProperty };
