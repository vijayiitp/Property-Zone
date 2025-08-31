import express from 'express';
import { SignUp, SignIn, LogOut, getUserProfile } from "../controllers/user.controller.js";
import { allProperties, newProperty, Request , DeleteProperty} from "../controllers/property.controller.js";
import { getPendingRequests, updateVisitRequestStatus } from "../controllers/request.controller.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleWare.js";

const app = express();

app.post('/register', SignUp);
app.post('/login', SignIn);
app.get('/logout', LogOut);

app.get("/propertylist", allProperties);
app.post("/newProperty", isAuthenticated, upload.single("image"), newProperty);
app.delete("/property/:id", isAuthenticated, DeleteProperty);

app.post("/visitRequest", isAuthenticated, Request);
app.get("/me", isAuthenticated, getUserProfile);
app.get("/requests", isAuthenticated, getPendingRequests);
app.put("/requests/:id/:decision", isAuthenticated, updateVisitRequestStatus);

export default app;
