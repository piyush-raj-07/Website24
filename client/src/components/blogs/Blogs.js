import React from "react";
import { useNavigate } from "react-router-dom";
import Card3D from "../Card3D";
import placementImg from "../images/placement.jpg";
import internshipImg from "../images/internship.jpg";
import courseImg from "../images/course.jpg";
import techImg from "../images/tech.webp";
import journeyImg from "../images/journey.jpg";
import mastersImg from "../images/masters.jpg";
const cards = [
  {
    id: "placement",
    cardTitle: "Placement Blogs",
    coverImage: placementImg,
      description: " Insights into campus placements, interview preparation strategies, company-specific experiences, and career growth tips. ",
  },
  {
    id: "internship",
    cardTitle: "Internship Blogs",
    coverImage: internshipImg,
      description: " Tips on finding internships, crafting resumes, preparing for interviews, and real-world experiences from interns.",
  },
  {
    id: "organization",
    cardTitle: "Course Blogs",
    coverImage: courseImg,
      description: " In-depth insights into academic courses, including syllabus breakdowns, study tips, and student experiences.",
  },
  {
    id: "tech",
    cardTitle: "Tech Blogs",
    coverImage: techImg,
      description: " Explore cutting-edge trends, and breakthrough technologies in circuits, embedded systems, signal processing, and beyond. ",
  },
  {
    id: "general",
    cardTitle: "Generic Blogs",
    coverImage: journeyImg,
      description: " Stories, lessons, and memorable moments from academics, friendships, and challenges that shape the journey.",
  },
    {
    id: "masters",
    cardTitle: "Master's Blogs",
    coverImage: mastersImg,
      description: " Dive into stories, strategies, and advice from students pursuing or preparing for Master's programs. Explore tips, life abroad, research journeys, and much more.",
  },

];

export default function Blogs() {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/Blogs/${id}`);
  };

  return (
    <div className="min-h-screen p-5 gradient_background ">
      <div className="mt-12 md:mt-24 grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-10 ">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="cursor-pointer transition-transform duration-300 hover:scale-105 m-auto  "
          >
            <Card3D cardTitle={card.cardTitle} coverImage={card.coverImage} description={card.description} />
          </div>
        ))}
      </div>
    </div>
  );
}
