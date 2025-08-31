import { useEffect, useState } from "react";
import axios from "axios";

interface Buyer {
  name?: string;
  phone?: string;
  email?: string;
}

interface Request {
  _id: string;
  buyerId?: Buyer;
  message?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onClose }) => {
  const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
  const [acceptedRequests, setAcceptedRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get<{ requests: Request[] }>(
          `${import.meta.env.VITE_SERVER}/api/v1/user/requests`,
          { withCredentials: true }
        );

        const allRequests = res.data.requests || [];
        const pending = allRequests.filter((req) => req.status === "pending");
        const accepted = allRequests.filter((req) => req.status === "accepted");

        setPendingRequests(pending);
        setAcceptedRequests(accepted);
      } catch (error: any) {
        console.error(
          "Error fetching requests:",
          error.response?.data || error.message
        );
      }
    };

    if (isOpen) fetchRequests();
  }, [isOpen]);

  const handleResponse = async (id: string, decision: "accepted" | "rejected") => {
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER}/api/v1/user/requests/${id}/${decision}`,
        {},
        { withCredentials: true }
      );
      setPendingRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (error: any) {
      console.error(
        "Error updating request:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b font-bold text-lg flex justify-between items-center">
          Requests
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Close
          </button>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto h-[90%]">
          {/* Pending Requests */}
          <div>
            <h2 className="text-md font-semibold border-b pb-1">Pending</h2>
            {pendingRequests.length === 0 ? (
              <p className="text-sm text-gray-500 mt-2">No pending requests.</p>
            ) : (
              pendingRequests.map((req) => (
                <div
                  key={req._id}
                  className="border p-3 rounded shadow-sm mt-2"
                >
                  <p>
                    <strong>From:</strong> {req.buyerId?.name || "Unknown"}
                  </p>
                  <p>
                    <strong>Message:</strong> {req.message || "No message"}
                  </p>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => handleResponse(req._id, "accepted")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleResponse(req._id, "rejected")}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Deny
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Accepted Requests */}
          <div>
            <h2 className="text-md font-semibold border-b pb-1">Accepted</h2>
            {acceptedRequests.length === 0 ? (
              <p className="text-sm text-gray-500 mt-2">
                No accepted requests.
              </p>
            ) : (
              acceptedRequests.map((req) => (
                <div
                  key={req._id}
                  className="border p-3 rounded shadow-sm mt-2 bg-green-50"
                >
                  <p>
                    <strong>From:</strong> {req.buyerId?.name || "Unknown"}
                  </p>
                  <p>
                    <strong>Contact:</strong>{" "}
                    {req.buyerId?.phone || req.buyerId?.email || "Not provided"}
                  </p>
                  <p>
                    <strong>Message:</strong> {req.message || "No message"}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(req.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default RightSidebar;
