import React, { useState } from "react";

interface Feedback {
  id: number;
  name: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  avatar: string;
  replies: any[];
}

interface StarRatingProps {
  rating: number;
}

interface FeedbackCardProps {
  feedback: Feedback;
}

const FeedbackPageWithSidebar: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 1,
      name: "Wilium Heli",
      date: "22, April 2025",
      rating: 5,
      title: "This is one of the best product.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac risus a risus elementum vehicula. Class aptent taciti soci ad litora torquent per conubia nostra, per inceptos himenaeos.",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      replies: [],
    },
  ]);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (): void => {
    if (!name || !title || !content) return alert("All fields required");
    const newFeedback: Feedback = {
      id: Date.now(),
      name,
      title,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      rating,
      content,
      avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
      replies: [],
    };
    setFeedbacks([newFeedback, ...feedbacks]);
    setName("");
    setTitle("");
    setContent("");
    setRating(5);
  };

  const StarRating: React.FC<StarRatingProps> = ({ rating }) => (
    <div className="flex items-center text-yellow-500 space-x-1">
      {Array.from({ length: rating }, (_, i) => (
        <span key={i}>★</span>
      ))}
      <span className="text-gray-700 ml-2">Rating: <strong>{rating.toFixed(1)}</strong></span>
    </div>
  );

  const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => (
    <div className="border-b pb-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <img
            src={feedback.avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <div className="font-semibold">{feedback.name}</div>
            <div className="text-sm text-gray-500">{feedback.date}</div>
          </div>
        </div>
        <StarRating rating={feedback.rating} />
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-lg">{feedback.title}</h3>
        <p className="text-gray-700 mt-2">{feedback.content}</p>
      </div>
      <button className="mt-3 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">
        Reply
      </button>
    </div>
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setRating(parseInt(e.target.value, 10));
  };

  return (
    <div className="min-h-screen p-4 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Feedback List (Left Side) */}
        <div className="md:w-2/3 bg-white rounded-xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-6">User Feedback</h2>
          {feedbacks.map((fb) => (
            <FeedbackCard key={fb.id} feedback={fb} />
          ))}
        </div>

        {/* Feedback Form (Right Side) */}
        <div className="md:w-1/3 bg-white rounded-xl p-6 shadow sticky top-10 h-fit">
          <h2 className="text-xl font-bold mb-4 text-indigo-700">Leave Your Feedback</h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="text"
            placeholder="Feedback Title"
            className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            placeholder="Your Feedback"
            rows={4}
            className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={content}
            onChange={handleContentChange}
          />
          <label className="block mb-2 font-medium text-gray-700">Rating:</label>
          <select
            className="w-full mb-4 px-3 py-2 border rounded-md"
            value={rating}
            onChange={handleRatingChange}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPageWithSidebar;
