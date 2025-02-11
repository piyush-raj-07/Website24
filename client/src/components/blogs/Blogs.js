import React from "react";
import { useNavigate } from "react-router-dom";
import Card3D from "../Card3D";

const cards = [
  {
    id: "placement",
    cardTitle: "Placement Series",
    coverImage:
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: "internship",
    cardTitle: "Internship Series",
    coverImage:
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: "organization",
    cardTitle: "Course Blogs",
    coverImage:
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
];

export default function Blogs() {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/Blogs/${id}`);
  };

  return (
    <div className="gradient_background">
      <h1>Blogs Page</h1>
      <div
        className="blogs-container"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "80px",
          padding: "200px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            style={{ cursor: "pointer" }}
          >
            <Card3D cardTitle={card.cardTitle} coverImage={card.coverImage} />
          </div>
        ))}
      </div>
    </div>
  );
}
