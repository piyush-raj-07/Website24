import React from "react";
import { useNavigate } from "react-router-dom";
import Card3D from "../Card3D";

const cards = [
  {
    id: "placement",
    cardTitle: "Placement Blogs",
    coverImage:
      "https://img.freepik.com/free-vector/illustrated-woman-being-intern-company_23-2148726151.jpg?ga=GA1.1.1025731536.1742313762&semt=ais_hybrid",
      description: " Insights into campus placements, interview preparation strategies, company-specific experiences, and career growth tips. ",
  },
  {
    id: "internship",
    cardTitle: "Internship Blogs",
    coverImage:
      "https://img.freepik.com/free-vector/internship-job-concept_23-2148721817.jpg?ga=GA1.1.1025731536.1742313762&semt=ais_keywords_boost",
      description: " Tips on finding internships, crafting resumes, preparing for interviews, and real-world experiences from interns.",
  },
  {
    id: "organization",
    cardTitle: "Course Blogs",
    coverImage:
      "https://img.freepik.com/free-vector/virtual-man-laptop-teaching-online_23-2148508675.jpg?ga=GA1.1.1025731536.1742313762&semt=ais_keywords_boost",
      description: " In-depth insights into academic courses, including syllabus breakdowns, study tips, and student experiences.",
  },
];

export default function Blogs() {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/Blogs/${id}`);
  };

  return (
    <div className="min-h-screen p-5 gradient_background">
      <div className="mt-10 md:mt-20 flex flex-wrap justify-center gap-10 md:gap-12">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <Card3D cardTitle={card.cardTitle} coverImage={card.coverImage} description={card.description} />
          </div>
        ))}
      </div>
    </div>
  );
}
