import React from "react";
import { useNavigate } from "react-router-dom";
import Card3D from "./Card3D";

const cards = [
  { id: 1, cardTitle: "Placement Series", coverImage: "Image1" },
  { id: 2, cardTitle: "Internship Series", coverImage: "Image2" },
  { id: 3, cardTitle: "Course Blogs", coverImage: "Image3" },
];

export default function Blogs() {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/Blogs/${id}`);
  };

  return React.createElement(
    "div",
    { className: "gradient_background" },
    React.createElement("h1", null, "Blogs Page"),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "80px",
          padding: "200px",
        },
      },
      ...cards.map((card) =>
        React.createElement(
          "div",
          {
            key: card.id,
            onClick: () => handleCardClick(card.id),
            style: { cursor: "pointer" },
          },
          React.createElement(Card3D, {
            cardTitle: card.cardTitle,
            coverImage: card.coverImage,
          })
        )
      )
    )
  );
}