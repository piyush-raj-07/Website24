import React from "react";
import { useNavigate } from "react-router-dom";
import Card3D from "../Card3D";

const cards = [
  {
    id: "placement",
    cardTitle: "Placement Blogs",
    coverImage:
      "https://img.freepik.com/free-photo/full-shot-people-discussing-work_23-2148868403.jpg?t=st=1742557264~exp=1742560864~hmac=82ec32d701b537d7378000799a06f3d4c4fcadcd48451daf3c01b77db2ed58f2&w=740",
      description: " Insights into campus placements, interview preparation strategies, company-specific experiences, and career growth tips. ",
  },
  {
    id: "internship",
    cardTitle: "Internship Blogs",
    coverImage:
      "https://img.freepik.com/free-photo/middle-aged-hispanic-business-people_23-2151099202.jpg?t=st=1742557135~exp=1742560735~hmac=099f5935025b789c216a216c64b7d47b6f46efbae93cb1b61be021eb55b9717c&w=740",
      description: " Tips on finding internships, crafting resumes, preparing for interviews, and real-world experiences from interns.",
  },
  {
    id: "organization",
    cardTitle: "Course Blogs",
    coverImage:
      "https://img.freepik.com/free-photo/creative-arrangement-world-book-day_23-2148883750.jpg?t=st=1742557030~exp=1742560630~hmac=faec90100fa88cc89e40c1df80f613001a3697daa4a317fb81897766565aa783&w=740",
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
