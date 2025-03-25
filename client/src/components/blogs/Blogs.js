import React from "react";
import { useNavigate } from "react-router-dom";
import Card3D from "../Card3D";

const cards = [
  {
    id: "placement",
    cardTitle: "Placement Blogs",
    coverImage:
      "https://media-hosting.imagekit.io//df23272158d7488c/full-shot-people-discussing-work.jpg?Expires=1837504585&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=BB8R3Tm1Nza~feZu357-o5AS~0RzVwdBJUomYkDXpsff8l2Pv~DvLB4TbPCtyE~RQZcf8S07FWObwfzJp4ybaZzXspG-NcE-uuDPoLjLYQIYb2WPDCM1wvO4V0aSI6bppmoXG~Weqenz6AqiPRfKj9iL3LMLxFU7NMK2OZtaPf0sM~EMOB7qI1GtexeW4wmBCcFb1A4fzseU2UV8z69bjMdOoBnsgkNcBRp6sQAAXxnM~CMmRHVnorcwGQdpBa75fWwpTExRTj2qJxiau6SyqPfm11NfGhWBzElxP2OXiz91GjGIRuVODRqvlj6AoHyhzG47jAqe5l8Y1klEh9bdaA__",
      description: " Insights into campus placements, interview preparation strategies, company-specific experiences, and career growth tips. ",
  },
  {
    id: "internship",
    cardTitle: "Internship Blogs",
    coverImage:
      "https://media-hosting.imagekit.io//d13ec6818c424d4a/middle-aged-hispanic-business-people%20(1).jpg?Expires=1837504634&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=g01Qmr4as5gNVTMkFPBnAiPKDz6cof~sCnWSiXf6Q3RaTL24qQkcPDyzYL1A~NpYfYpRExgjVdpd8BP51af5MkgiPownOu5sFhKDHhNBWISf7OAFwrYwG6o-g5Zb-jZ4sMHRFqYx~wacGh3qpXIV-1XRBD3EDef4V6BCl7P6F6W4T8Da8~fnqapVVvOgp9MLG1ZyaG1HLwgpat9pItapwqCrDoRC7MdPKYLl0-jVE0ZqSUJVgU8mwqA6EldQ6THP85Z3smgLfqAgf6M-aEXGeP8SxMtxd1gJ2YACpy~H67kpfihMERimCGMi4gciNm0-VWiYSfzuGVDzg9CA6nG8og__",
      description: " Tips on finding internships, crafting resumes, preparing for interviews, and real-world experiences from interns.",
  },
  {
    id: "organization",
    cardTitle: "Course Blogs",
    coverImage:
      "https://media-hosting.imagekit.io//2b90220ab23243a1/creative-arrangement-world-book-day.jpg?Expires=1837504671&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=n8mGSIUFU9Jp-nOFmMlywsBUdYdLRIefyqGNqHgSU0h0rppL24dwzdH~UNixkNEdYDbfY3hpKy~s0a8qy9cpF82idqOMEb3Urnw3C3abpE56ugvqFGlI6vNgQY9i80J8JQigJOI1UUb48uUwtbVar0AaQ2CsLo8ImGwSZRyw4CppkAek0JO5obFlSQ6ELb21tMbQjYXeSEsH-3H97Eozd3VU-43QEvtpsiufZCZOYqgG8WdbWaB1JdHRos8ltJy5GRSSW8GKb28ZGbQbz7Sicd5uW4Q6swU6azLne50zvY4G2MLaisH8tW3nsuXzvURmGO6Z-6npdUcbvEqwwKYhlQ__",
      description: " In-depth insights into academic courses, including syllabus breakdowns, study tips, and student experiences.",
  },
  {
    id: "tech",
    cardTitle: "Tech Blogs",
    coverImage:
      "https://media-hosting.imagekit.io//57f4c463603b4f44/closeup-electronic-circuit-board-with-cpu-microchip-electronic-components-background.jpg?Expires=1837503564&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=UJTZWVVwLouYOIvAG9W5CjRJrk~-qsOPePLu7a1mog3Uic3E1LauMOK3QPMyuz-tWtX-vEcm99H9dkTTuBAPnCwXB9bgST0IlxKHHAUPYWPeM3Pv~gwQOsSXLMrjSXCijI-CD9olV0wKa32PmaVk56zfqF0w0Y3geQZhjpZRZBVdGMdqFfAEpXAyRZIPhuWLzkRSZhJ76jBMFZQPdF92BY8EFkCDDItS-Vn-vs1AyEpgcjNP3ytOeX023oqfluaeAaH23ZisEMRRX7WEgdMSRktzdFLT9YwG2aNXtqi~oBwS6ZrehcvJm7tTYTvS8FNwAanL6jEkEDf25dGKScCzKA__",
      description: " Explore cutting-edge trends, and breakthrough technologies in circuits, embedded systems, signal processing, and beyond. ",
  },
  {
    id: "general",
    cardTitle: "Journey Blogs",
    coverImage:
      "https://media-hosting.imagekit.io//bd3e3322ad2d465d/student-walking-graduation-ceremony.jpg?Expires=1837504901&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=FFJA6pnHqjUuzgrVIMIlGQWo52W-5~kEnDN2cXJKVp6o-pIYtHi79H9~ZzlDKp0876TFAmKxFDbPjkSEeuYFO~fKbpjFfWW2IfUKk~cqH0wVRju0r~3Rn8lyKIhZrhijtJDnrKbanMgPIJcqclRzhcOtKp83kEOsKnbwulxFWzL7RqnRz3OdQMogST6e9A8xAHmNuqTTtBpFWsM24UEMFgj5JtjgpZcrqVVfDUdU94A3nQ5yZ0yzcwlUv33YQNu9pQ9gN8pYbMakf6mMrjA43TrP6M5uTZEUbDXsmB~DvmKcVZ9HBd3WvZ2XZffk~vrGnBKraDzSq3WrmRfv-HOyug__",
      description: " Stories, lessons, and memorable moments from academics, friendships, and challenges that shape the journey.!",
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
