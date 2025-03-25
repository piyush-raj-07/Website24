import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Linkedin, Instagram, Video } from 'lucide-react';
import { Footer } from "./footer";

const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function TeamPage() {
  const teamData = {
    presidentFounder: [
      { id: "1", name: "Dr. Vijay A.S.", role: "Founder", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1734711523/Screenshot_2024-12-20_214659_bddpps.png", linkedinUrl: "https://www.linkedin.com/in/dr-vijay", instagramUrl: "https://www.instagram.com/dr.vijay" },
      { id: "2", name: "Rishit Mehrotra", role: "President", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742486323/eesa_web_pic_magicstudio_foaznp8un1j_kdaipn.png", linkedinUrl: "https://www.linkedin.com/in/rishit-mehrotra?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/rishit_mehrotra_?igsh=MWl4dHhoYjEzM3Yzeg==" },
    ],
    heads: [
      { id: "1", name: "Tanushree Dewangan", role: "Head of Web Team", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742400283/IMG_3495_frqhqv.jpg", linkedinUrl: "https://www.linkedin.com/in/tanushree-dewangan-738957250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", instagramUrl: "https://www.linkedin.com/in/tanushree-dewangan-738957250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
      { id: "2", name: "Naveen S H", role: "Head of Web Team", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742385589/IMG-20240524-WA0000_1_-_Captn_Plays_1_yh5mgi.jpg", linkedinUrl: "https://www.linkedin.com/in/naveen-sh-a7594b323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/naveen_sh07?igsh=ODlzNTdvaW96c2g="  },
      { id: "3", name: "Satvik Desai", role: "Head of Content & Social Media", imageUrl: "https://media-hosting.imagekit.io//f0356664fe95443d/Screenshot%20from%202025-03-21%2008-49-02.png?Expires=1837144887&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=t6jTCGjav~gHld1yB8G3SERCXaoKUW7aI-YiM6gN5ayK58dYuaNKdnHZjsG7WczGxHO8Q87AzhqwRKG5C3EXuBWkrfXXurZyZ6xuot3EHs65aE6vr6daqOOXv9VTL9QUZeJZZvIYumN9CIAwu1Pq4rNIv-Ao0YU~N3KvLbGiMNA4yCX4NHI71SLhZf7Bts7GYrBLnXboxss-0gRbwqPPzS1fxunJwCQz1OduWRxa8lhwxDk3mw7rsBi-Nq-m6lxx0tPvIuv~ljgh~iOiaz21bLFBCct23WEZKbiUKnEWHsJBjFQvMlleL88dOhzWwm7lWPPYzpdQzSA-wmI7eebGtA__", linkedinUrl: "https://www.linkedin.com/in/satvik-desai-b77a2524b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/satvik_3184?igsh=NGtoeTNkczJ3MWti" },
      { id: "4", name: "Tejas Chaudhari", role: "Head of Creatives & Video Production", imageUrl: "https://media-hosting.imagekit.io//1187170b3f1246db/IMG_6942%20(1).JPG?Expires=1837160182&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=I9KUAlfyUzhyDDH~TMo0FSZWGvVxXT7vppsqfy7mWgC5ksBWbHFN6tm7JoosNyLUGIVEtkBsZewMKg3UAiobbqKKUpO26AuSbE5lFr-z9sq2oFXHegthPmlMJrHxCu-63ht1vbNayLE-FnYCwrmXBy3koqgWtm3m9RMcbSLS98hiwaPjcacbc6F85UAKh2v7N-mQ2NGC6Hh6VR~~fKW~DCqH1bZqbAWDLTtwvpMnQOJmr98neJLK3Nf9NazBS1PgX~gCzEUxYHqnCCL-DAWCnY2QUYzjLWmgbamdKv-qxAaC0poCY7KidPHknkvadCoEOqIKKPmK-TYpPM88zQOZGw__", linkedinUrl: "https://www.linkedin.com/in/tejas-chaudhari-650543250/", instagramUrl: "https://www.instagram.com/tejas.chaudhari22/" },
      { id: "5", name: "Rakshit Jangid", role: "Head of Events", imageUrl: "https://media-hosting.imagekit.io//cf34524b941f4d74/IMG_6944.jpg?Expires=1837161675&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=XlAa1ITWSLRrfm64Mtd-PSTYTH41KfMHWZt0G5D3m8rzOWDSdn8C2GTuiW~UJ3tLPl-4Ic~aNiBEUVXHjpAS9u6j9csglAlSRYWssjlEE3-RVQniLaEDmdgHSFp~gtkSNf5w2OURzj8BFM4g1xbhrSeRyCiNcpgZ-6U15UEC-LmyKlI1p2pqD4yXDtbFV5iG3h4K~9eA4rknDeQgVE68nTN4mi-U9UqRQ3NKtq3bu6WpRedumosXNfM1I0du6ZzDg-s4ymrAHA7DPAqNxMVhahlhXC0saz0qFUeeMr2Ho5ZVSo~dbD4cANvJSxzV0NPirWZL8WLPvSt3PaOehcXKIw__", linkedinUrl: "https://www.linkedin.com/in/rakshit-jangid?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/rakshitjangid22?igsh=MTFjZHFuc2c1eGJ6bQ==" },
    ],
    web: [
      { name: "Rohit Prajapati ", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742385787/Screenshot_2025-02-01-19-59-44-03_e2d5b3f32b79de1d45acd1fad96fbb0f_-_Rohit_Prajapati_1_hlvja1.jpg", linkedinUrl: "linkedin.com/in/Rohit Prajapati", instagramUrl: "" },
      { name: "Krish Pathak", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742385965/WhatsApp_Image_2025-02-02_at_12.18.37_e78e4f6e_-_Krish_Pathak_1_arkakq.jpg", linkedinUrl: "https://www.linkedin.com/in/krishpathak25/", instagramUrl: "https://www.instagram.com/krishpathak_25/" },
      { name: "Harshita Bankure", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742386040/a0ae589a-7474-4320-be06-94b2901cbac8_-_Shivam_Sharma_az0abi.jpg", linkedinUrl: "https://www.linkedin.com/in/harshita-bankure-37508525b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/harshita_bankure?igsh=djZra3p3aGsyNjhr" },
      { name: "Piyush Raj", role: "Full Stack", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318237/raja_-_Piyush_Raj_xu3lci.jpg", linkedinUrl: "https://www.linkedin.com/in/webdev1", instagramUrl: "https://www.instagram.com/webdev1" },
      { name: "Janhvi Verma", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318263/WhatsApp_Image_2025-02-03_at_19.24.12_eff9c39f_-_Janhvi_Verma_bmth71.jpg", linkedinUrl: "www.linkedin.com/in/janhvi-verma0103", instagramUrl: "" },

    ],
    // Events
    design: [
      { name: "Jayanth ", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318342/IMG_20241015_132023_344_-_Malireddi_Jayanth_1_gmqcxc.webp", linkedinUrl: "https://www.linkedin.com/in/jayanth-mallireddi-317654284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/im_jayanthhh/profilecard/?igsh=MWc2aTdpbmU2bWtlbg==" },
      { name: "Mor Vrushabh Bharatbhai ", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742362825/Vrushabh_Passport_size_photograph_-_Vrushabh_Mor_page-0001_dlg51w.jpg", linkedinUrl: "https://www.linkedin.com/in/design2", instagramUrl: "https://www.instagram.com/design2" },
      { name: "B Nikhil", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318518/Nikhil_pic_1_-_Bhasuru_Nikhil_cvrwwu.jpg", linkedinUrl: "https://www.linkedin.com/in/nikhil-bhasuru-2196a6314/", instagramUrl: "https://www.instagram.com/nikhilb_183/" },
      { name: "Yash Modi", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318511/27cb7aa1-453f-40f8-b71c-05a214b96cde_-_Yash_Modi_bqfsp8.jpg", linkedinUrl: "http://linkedin.com/in/yash-modi-6b8644332", instagramUrl: "https://www.instagram.com/imyash_m17/profilecard/?igsh=cXFxZnd1bDU4Z3N3" },
      { name: "Tanish Kamal ", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318481/IMG-20240613-WA0006_-_Tanish_Kamal_q9ibpg.jpg", linkedinUrl: "https://www.linkedin.com/in/tanish-kamal-7b2825281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/tanishkamal79/profilecard/?igsh=YXR2ZzM1cTZuN2oz" },
      { name: "Ninad Kulkarni ", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318290/IMG_20250106_222912_-_Ninad_Kulkarni_ccidas.jpg", linkedinUrl: "https://www.linkedin.com/in/ninad-kulkarni-102434317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/ninad_k_/profilecard/?igsh=anUzbGptZndqcW1j" },
      { name: "Advay Kunte  ", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318309/IMG-20241201-WA0000_-_Advay_Kunte_pjmzve.jpg", linkedinUrl: "https://www.linkedin.com/in/advay-kunte?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/advay_kunte.8/profilecard/?igsh=OGZubXA5dTk5N25t" },
      { name: "Aditi luniya  ", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318319/IMG_20241107_201322_-_Aditi_Luniya_tv6x5p.jpg", linkedinUrl: "https://www.linkedin.com/in/aditi-luniya-9960a5286?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.linkedin.com/in/aditi-luniya-9960a5286?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { name: "Naman Goyal ", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742362515/9d413970-b898-4de4-b2aa-5669b99728d8_-_Naman_Goyal_1_zbwiyc.jpg", linkedinUrl: "https://www.linkedin.com/in/naman-goyal-432140282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", instagramUrl: "naman_goyal.04" },
      { name: "Aakarsh Atluri  ", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1742318411/Aakarsh1_-_Atluri_Aakarsh_bgtyyu.jpg", linkedinUrl: "https://www.linkedin.com/in/atluri-aakarsh-a08008320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/aakarsh_atluri/profilecard/?igsh=MXI2cTlhNmhxbnJsaA==" },

    ],
    content: [
      { name: "Prateek Rajput", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318579/20240527_202527_-_Prateek_cnrsp6.jpg", linkedinUrl: "https://www.linkedin.com/in/prateek-rajput-46b9ba287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/prateek.r.rajput/profilecard/?igsh=cHc5bGc1d2x2amNj" },
      { name: "Viraj Samir Patel", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318393/IMG_20241231_223503_633_-_Viraj_patel_fxonao.jpg", linkedinUrl: "https://www.linkedin.com/in/viraj-patel-5a3229330/", instagramUrl: "https://www.instagram.com/viraj_p18/" },
      { name: "Shrish Shriyans", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1742318136/91bbe82d-b102-4bd4-a6f9-e86ae9212eeb_-_Shrish_Shriyans_sv07i6.jpg", linkedinUrl: "", instagramUrl: "" },
      { name: "Hilori Jain ", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318381/IMG-20240307-WA0152_-_Hilori_Jain_gkqovk.jpg", linkedinUrl: "https://www.linkedin.com/in/hilori-jain?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/hilori_jain?utm_source=qr" },
    ],
    // creatives
    autonomy: [

      { name: "Naman V Shetty", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318475/Naman_V_Shetty_-_Naman_V_Shetty_ntmv0e.jpg", linkedinUrl: "www.linkedin.com/in/naman-v-shetty", instagramUrl: "www.instagram.com/naman._.shetty/" },
      { name: "Aditya Naskar ", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318420/IMG20241228174641_-_Aditya_Naskar_dthbsw.jpg", linkedinUrl: "https://www.linkedin.com/in/aditya-naskar-0336a9257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/xx_adi.07/profilecard/?igsh=MXRwMGNhcmM1MGR3Yg==" },
      { name: "Abhijeet Parmar ", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318404/IMG_20240906_224646_-_Abhijeet_Parmar_gu726k.jpg", linkedinUrl: "https://www.linkedin.com/in/abhijeet-parmar-a08696281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/abhijeet_parmar_05/profilecard/?igsh=eXptNjZtNGx3YnBk" },
      { name: "Ragini jaiswal ", role: "Control Systems Engineer", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1742318185/20250105_172424_-_Ragini_Jaiswal_1_yeqnz6.jpg", linkedinUrl: "https://www.linkedin.com/in/ragini-jaiswal-48a5002aa", instagramUrl: "ragini_sings" },
      { name: "Aakarsh Atluri  ", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1742318411/Aakarsh1_-_Atluri_Aakarsh_bgtyyu.jpg", linkedinUrl: "https://www.linkedin.com/in/atluri-aakarsh-a08008320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/aakarsh_atluri/profilecard/?igsh=MXI2cTlhNmhxbnJsaA==" },

    ],
    video: [
      { name: "K Bharath Varma", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318591/IMG_5613_-_Varma_Kalidindi_glzoms.jpg", linkedinUrl: "https://www.linkedin.com/in/bharath-varma-kalidindi-8a1763280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", instagramUrl: "https://www.instagram.com/bharath__.__varma/profilecard/?igsh=aGlmcWtuOTEwN3Uw" },
      { name: "Sasi Kiran Pulapakura ", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318569/Sasi_Kiran_Pulapakura_-_Sasi_Kiran_Pulapakura_yr2caw.jpg", linkedinUrl: "https://www.linkedin.com/in/sasi-kiran-pulapakura-3bab1b31b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagramUrl: "https://www.instagram.com/sasikiranpulapakura" },
      { name: "Aditya Gandhra", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318297/IMG_6758_-_Aditya_Gandhra_nr3ugu.jpg", linkedinUrl: "https://www.linkedin.com/in/adityagandhra?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", instagramUrl: "https://www.instagram.com/adityagandhra?igsh=MnZjdGVjeGtlcTQ4&utm_source=qr" },
      { name: "Aadarsh Ranjan", imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1742318333/IMG-20241211-WA0040_-_Aadarsh_Ranjan_mngqel.jpg", linkedinUrl: "linkedin.com/in/aadarsh-ranjan-552080260", instagramUrl: "https://www.instagram.com/solanki_aadarsh_?igsh=YzljYTk1ODg3Zg==" },

     
    ]

  };

  const customStyles = `
  .slick-slide {
    opacity: 0.7;
    transition: all 0.5s ease;
    transform: scale(0.95);
  }
  .slick-slide.slick-active {
    opacity: 1;
    transform: scale(1);
  }
  .slick-prev, .slick-next {
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 50%;
    display: block;
    width: 40px;
    height: 40px;
    padding: 0;
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    z-index: 1;
    transition: all 0.3s ease;
  }
  .slick-prev:hover, .slick-next:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  .slick-prev {
    left: -50px;
  }
  .slick-next {
    right: -50px;
  }
  .slick-prev:before, .slick-next:before {
    font-family: 'slick';
    font-size: 30px;
    line-height: 1;
    opacity: 0.75;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }
  .slick-dots {
    bottom: -40px;
  }
  .slick-dots li button:before {
    font-size: 12px;
    color: white;
    opacity: 0.5;
    transition: all 0.3s ease;
  }
  .slick-dots li.slick-active button:before {
    opacity: 1;
    transform: scale(1.2);
  }
  .group:hover .group-hover\\:scale-110 {
    transform: scale(1.1);
  }
  .group:hover .group-hover\\:opacity-100 {
    opacity: 1;
  }
  .animate-gradient-x {
    animation: gradient-x 15s ease infinite;
  }
  @keyframes gradient-x {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  `;


  return (
    <div className="bg-[#0c0c0c]">

      {/* Hero Section */}
      <div className="relative  h-[650px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 opacity-50"
          style={{
            backgroundImage: "url('https://media-hosting.imagekit.io//3bc7b489595d4f44/IMG_6116%20(1).JPG?Expires=1837160768&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=PQu7qRY5Fu6SedYYSNy5pbOIho0HT6vcFYxJTvslBsyleDniQlD09U1Qjq556vS4fAmNilpZfa9prHKet7ebvzT0enXGfE6Ltv3uzo2HIxbNaQB1pS1EcwVLjSlb4l7bfbme9qw-QkMjdX6gaUrOMo6Uh99AaPPLJsIQsPeuGJ3v9mzonx1hcavh3bFsHVGfKI4kJTux5N2TsbC5tJmV3p2kC4ApvzW~HNsC-xiR4hJt87e~~wnRCPqqV7WHFWHj~4nrRd0HhIvkzGP3S8aPVUlzIB~XKLxJ2TVDWU2DFfSM2OOrih9RfzDvtvRz7zd3W7d7pksGngCpCPSEwagO-g__')",
          }}
          role="img"
          aria-label="Team background image"
        ></div>
        <div className="absolute inset-0 "></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 mt-10 md:mt-16 lg:mt-20">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[white] mb-2">Meet Our Team</h1>
          <p className="text-[#a70ff4] bg-[black] text-xl md:text-2xl lg:text-3xl mb-6 font-semibold font-serif">EESA IIT Indore</p>
        </div>
      </div>

    

      {/* President and Founder Section */}
      <section className="bg-gradient-to-b from-[#111111] from-0.1% to-[#3b0a45]   pb-10' py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
        <h2 className="text-4xl font-raleway font-bold mb-20 text-white text-center relative z-10">Meet President and Founder</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-4 relative z-10">
          {teamData.presidentFounder.map((member) => (
            <div key={member.id} className="text-center">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg group">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300 mr-2">
                    <Linkedin size={24} />
                  </a>
                  <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <h3 className="text-white font-raleway font-semibold">{member.name}</h3>
              <p className="text-gray-400 font-libre">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Heads Section */}
      <section className="bg-gradient-to-b from-[#3b0a45] from-0.1% to-[#2c003e] py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-white text-center relative z-10">Meet Our Heads</h2>
        <div className="px-12 relative z-10">
          <Slider {...carouselSettings} className="py-8">
            {teamData.heads.map((member) => (
              <div key={member.id} className="text-center px-4">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                  <img
                    src={member.imageUrl || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300 mr-2">
                      <Linkedin size={24} />
                    </a>
                    <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300">
                      <Instagram size={24} />
                    </a>
                  </div>
                </div>
                <h3 className="text-white font-raleway font-semibold text-lg md:text-xl">{member.name}</h3>
                <p className="text-gray-400 font-libre text-sm">{member.role}</p>
              </div>
            ))}

          </Slider>

        </div>

      </section>


      {/* Teams Sections */}
      <WebTeamSection team={teamData.web} />
      <DesignTeamSection team={teamData.design} />
      <ContentTeamSection team={teamData.content} />
      <AutonomyTeamSection team={teamData.autonomy} />
      <VideoTeamSection team={teamData.video} />
      <Footer>
      </Footer>

      <style jsx>{customStyles}</style>
    </div>
  );
}

function WebTeamSection({ team }) {
  return (
    <section className="bg-gradient-to-b from-[#2c003e] from-0.1% to-[#440075] pb-10' py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
      <h2 className="text-4xl font-raleway font-bold mb-12 text-white text-center relative z-10">
        Meet Our Web Team
      </h2>
      <div className="px-12 relative z-10">
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300 mr-2">
                    <Linkedin size={24} />
                  </a>
                  {/* Added Instagram link */}
                  <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <h3 className="text-white mb-2 font-raleway font-semibold font-raleway text-xl">{member.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

function DesignTeamSection({ team }) {
  return (
    <section className="bg-gradient-to-b from-[#440075] from-0.1% to-[#52006b]  py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>

      <h2 className="text-4xl font-bold mb-12 text-white text-center relative z-10">
        Meet Our Events Team

      </h2>
      <div className="px-12 relative z-10">
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300 mr-2">
                    <Linkedin size={24} />
                  </a>
                  {/* Added Instagram link */}
                  <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <h3 className="text-white mb-2 font-raleway font-semibold text-xl">{member.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

function ContentTeamSection({ team }) {
  return (
    <section className="bg-gradient-to-b from-[#52006b] from-0.1% to-[#6a0dad] py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
      <h2 className="text-4xl font-raleway font-bold mb-12 text-white text-center relative z-10">
        Meet Our Content Team
      </h2>
      <div className="px-12 relative z-10">
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300 mr-2">
                    <Linkedin size={24} />
                  </a>
                  {/* Added Instagram link */}
                  <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <h3 className="text-white mb-2 font-raleway font-semibold text-xl">{member.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

function AutonomyTeamSection({ team }) {
  return (
    <section className="bg-gradient-to-b from-[#6a0dad] to-[#a45dbb] py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>

      <h2 className="text-4xl font-bold mb-12 text-white text-center relative z-10">
        Meet Our Creatives Team

      </h2>
      <div className="px-12 relative z-10">
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300 mr-2">
                    <Linkedin size={24} />
                  </a>
                  {/* Added Instagram link */}
                  <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <h3 className="text-white mb-2 font-raleway font-semibold text-xl">{member.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
function VideoTeamSection({ team }) {
  return (
    <section className="bg-gradient-to-b from-[#a45dbb] from-0.1% to-[#a45dbb] py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
      <h2 className="text-4xl font-bold mb-12 text-white text-center relative z-10">
        Meet Our Video Production & Finance Team
      </h2>
      <div className="px-12 relative z-10">
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 group">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300 mr-2">
                    <Linkedin size={24} />
                  </a>
                  {/* Added Instagram link */}
                  <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors duration-300">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <h3 className="text-white mb-2 font-semibold text-xl">{member.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}


export default TeamPage;




