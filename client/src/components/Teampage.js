"use client"

import { useEffect, useState, useRef } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Linkedin, Instagram } from "lucide-react"
import AnimatedWaveBackground from "./AnimatedB.jsx"
import { motion } from "framer-motion"
import { Footer } from "./footer2.js"
import img from './images/team.jpg'
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
}

function TeamPage() {
  const [isVisible, setIsVisible] = useState({})
  const sectionRefs = {
    hero: useRef(null),
    presidentFounder: useRef(null),
    heads: useRef(null),
    web: useRef(null),
    design: useRef(null),
    content: useRef(null),
    autonomy: useRef(null),
    video: useRef(null),
  }

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all section refs
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.id = key
        observer.observe(ref.current)
      }
    })

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current)
      })
    }
  }, [])

  const teamData = {
    presidentFounder: [
      {
        id: "1",
        name: "Dr. Vijay",
        role: "Founder",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1734711523/Screenshot_2024-12-20_214659_bddpps.png",
        linkedinUrl: "https://www.linkedin.com/in/dr-vijay",
        instagramUrl: "https://www.instagram.com/dr.vijay",
      },
      {
        id: "2",
        name: "Rishit Mehrotra",
        role: "President",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742486323/eesa_web_pic_magicstudio_foaznp8un1j_kdaipn.png",
        linkedinUrl:
          "https://www.linkedin.com/in/rishit-mehrotra?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/rishit_mehrotra_?igsh=MWl4dHhoYjEzM3Yzeg==",
      },
    ],
    heads: [
      {
        id: "1",
        name: "Tanushree Dewangan",
        role: "Head of Web Team",
        imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742400283/IMG_3495_frqhqv.jpg",
        linkedinUrl: "https://www.linkedin.com/in/tanushree-dewangan-738957250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        instagramUrl: "https://www.linkedin.com/in/tanushree-dewangan-738957250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      },
      {
        id: "2",
        role: "Head of Web Team",
        name: "Naveen S H",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742385589/IMG-20240524-WA0000_1_-_Captn_Plays_1_yh5mgi.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/naveen-sh-a7594b323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/naveen_sh07?igsh=ODlzNTdvaW96c2g=",
      },
      {
        id: "3",
        role: "Head of Creatives & Video Prouction",
        name: "Tejas Chaudhari",
        imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742486321/IMG-20250126-WA0111_rqjhgv.jpg",
        linkedinUrl: "https://www.linkedin.com/in/tejas-chaudhari-650543250/",
        instagramUrl: "https://www.instagram.com/tejas.chaudhari22/",
      },
      {
        id: "4",
        name: "Rakshit jangid",
        role: "Head of Events",
        imageUrl: "https://res.cloudinary.com/dmr8qadjn/image/upload/v1742924333/1_fxdzsw.jpg",
        linkedinUrl: "https://www.linkedin.com/in/rakshit-jangid?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/rakshitjangid22?igsh=MTFjZHFuc2c1eGJ6bQ==",
      },
      {
        id: "5",
        name: "Satvik Desai",
        role: "Head of Content & Social Media",
        imageUrl: "https://res.cloudinary.com/dmr8qadjn/image/upload/v1742924857/satvik_ffzf37.png",
        linkedinUrl: "https://www.linkedin.com/in/satvik-desai-b77a2524b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/satvik_3184?igsh=NGtoeTNkczJ3MWti",
      },
      {
        id: "6",
        name: "Aadarsh Ranjan",
        role: "Head of Finance",
        imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1742318333/IMG-20241211-WA0040_-_Aadarsh_Ranjan_mngqel.jpg",
        linkedinUrl: "https://www.linkedin.com/in/aadarsh-ranjan-552080260/",
        instagramUrl: "https://www.instagram.com/solanki_aadarsh_?igsh=YzljYTk1ODg3Zg==",
      },
      
    ],
    web: [
      {
        name: "Rohit Prajapati ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742385787/Screenshot_2025-02-01-19-59-44-03_e2d5b3f32b79de1d45acd1fad96fbb0f_-_Rohit_Prajapati_1_hlvja1.jpg",
        linkedinUrl: "linkedin.com/in/Rohit Prajapati",
        instagramUrl: "",
      },
      {
        name: "Krish Pathak",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742385965/WhatsApp_Image_2025-02-02_at_12.18.37_e78e4f6e_-_Krish_Pathak_1_arkakq.jpg",
        linkedinUrl: "https://www.linkedin.com/in/krishpathak25/",
        instagramUrl: "https://www.instagram.com/krishpathak_25/",
      },
      {
        name: "Harshita Bankure",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742386040/a0ae589a-7474-4320-be06-94b2901cbac8_-_Shivam_Sharma_az0abi.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/harshita-bankure-37508525b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/harshita_bankure?igsh=djZra3p3aGsyNjhr",
      },
      {
        name: "Piyush Raj",
        
        imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318237/raja_-_Piyush_Raj_xu3lci.jpg",
        linkedinUrl: "https://www.linkedin.com/in/piyush-raj-0a1975284/?originalSubdomain=in",
        instagramUrl: "https://www.instagram.com/piyush775raj/",
      },
      {
        name: "Janhvi Verma",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318263/WhatsApp_Image_2025-02-03_at_19.24.12_eff9c39f_-_Janhvi_Verma_bmth71.jpg",
        linkedinUrl: "https://www.linkedin.com/in/janhvi-verma0103/",
        instagramUrl: "",
      },
      {
        name: "Aniket Goyal",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1743244427/WhatsApp_Image_2025-03-29_at_15.58.12_15c3b96b_cf1b9s.jpg",
        linkedinUrl: "",
        instagramUrl: "https://www.instagram.com/anikxt_goyal?igsh=MXBnOXlva2Z6ZzRzNg==",
      },
      {
        name: "Himanshu",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1743528975/Himanshu_fbqeqy.jpg",
        linkedinUrl: "https://www.linkedin.com/in/himanshu-8104ab299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/jadu_hkhk?igsh=MTYzam5sYjk4YXYxZA==",
      },
    ],
    // Events
    design: [
      {
        name: "Jayanth ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318342/IMG_20241015_132023_344_-_Malireddi_Jayanth_1_gmqcxc.webp",
        linkedinUrl:
          "https://www.linkedin.com/in/jayanth-mallireddi-317654284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/im_jayanthhh/profilecard/?igsh=MWc2aTdpbmU2bWtlbg==",
      },
      {
        name: "P Havish  ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1743445339/IMG-20250102-WA0024_-_Havish_1_fxrf5o.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/havish-p-15325031a/",
        instagramUrl: "https://www.instagram.com/havishmurugan7/",
      },
      {
        name: "Anmol Kumar ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318273/anmol_pic_yymicr.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/kumar-anmol-196156250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/uniqueverseak?igsh=MW8zZ2VoODNka2Ezdw==",
      },
      {
        name: "Mor Vrushabh Bharatbhai ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742362825/Vrushabh_Passport_size_photograph_-_Vrushabh_Mor_page-0001_dlg51w.jpg",
        linkedinUrl: "https://www.linkedin.com/in/mor-vrushabh-bharatbhai-b98a4325b",
        instagramUrl: "",
      },
      {
        name: "B Nikhil",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318518/Nikhil_pic_1_-_Bhasuru_Nikhil_cvrwwu.jpg",
        linkedinUrl: "https://www.linkedin.com/in/nikhil-bhasuru-2196a6314/",
        instagramUrl: "https://www.instagram.com/nikhilb_183/",
      },
      {
        name: "Yash Modi",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318511/27cb7aa1-453f-40f8-b71c-05a214b96cde_-_Yash_Modi_bqfsp8.jpg",
        linkedinUrl: "http://linkedin.com/in/yash-modi-6b8644332",
        instagramUrl: "https://www.instagram.com/imyash_m17/profilecard/?igsh=cXFxZnd1bDU4Z3N3",
      },
      {
        name: "Tanish Kamal ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318481/IMG-20240613-WA0006_-_Tanish_Kamal_q9ibpg.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/tanish-kamal-7b2825281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/tanishkamal79/profilecard/?igsh=YXR2ZzM1cTZuN2oz",
      },
      {
        name: "Ninad Kulkarni ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318290/IMG_20250106_222912_-_Ninad_Kulkarni_ccidas.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/ninad-kulkarni-102434317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/ninad_k_/profilecard/?igsh=anUzbGptZndqcW1j",
      },
      {
        name: "Advay Kunte  ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318309/IMG-20241201-WA0000_-_Advay_Kunte_pjmzve.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/advay-kunte?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/advay_kunte.8/profilecard/?igsh=OGZubXA5dTk5N25t",
      },
      {
        name: "Aditi luniya  ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318319/IMG_20241107_201322_-_Aditi_Luniya_tv6x5p.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/aditi-luniya-9960a5286?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl:
          "https://www.instagram.com/aditi.luniya?igsh=MTA0YjVzeTFkZGh6",
      },
      {
        name: "Naman Goyal ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742362515/9d413970-b898-4de4-b2aa-5669b99728d8_-_Naman_Goyal_1_zbwiyc.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/naman-goyal-432140282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        instagramUrl: "https://www.instagram.com/naman_goyal.04?igsh=MWNjOW8xNzBqZG5jeQ==",
      },
      {
        name: "Aakarsh Atluri  ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1742318411/Aakarsh1_-_Atluri_Aakarsh_bgtyyu.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/atluri-aakarsh-a08008320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/aakarsh_atluri/profilecard/?igsh=MXI2cTlhNmhxbnJsaA==",
      },
    ],
    content: [
      {
        name: "Prateek Rajput",
        imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318579/20240527_202527_-_Prateek_cnrsp6.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/prateek-rajput-46b9ba287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/prateek.r.rajput/profilecard/?igsh=cHc5bGc1d2x2amNj",
      },
      {
        name: "Viraj Samir Patel",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318393/IMG_20241231_223503_633_-_Viraj_patel_fxonao.jpg",
        linkedinUrl: "https://www.linkedin.com/in/viraj-patel-5a3229330/",
        instagramUrl: "https://www.instagram.com/viraj_p18/",
      },
      {
        name: "Shrish Shriyans",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1742318136/91bbe82d-b102-4bd4-a6f9-e86ae9212eeb_-_Shrish_Shriyans_sv07i6.jpg",
        linkedinUrl: "",
        instagramUrl: "",

      },
      {
        name: "Hilori Jain ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318381/IMG-20240307-WA0152_-_Hilori_Jain_gkqovk.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/hilori-jain?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/hilori_jain?utm_source=qr",
      },
      {
        name: "Anshita Pandey ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318585/IMG-20230928-WA0026_-_Anshita_Pandey_rfcyyd.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/anshita-pandey-b10b12286?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/anshita_pandeyy/profilecard/?igsh=M2RsM2gycGtkZjJl",
      },
    ],
    // Creatives
    autonomy: [
      {
        name: "Naman V Shetty",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318475/Naman_V_Shetty_-_Naman_V_Shetty_ntmv0e.jpg",
        linkedinUrl: "https://www.linkedin.com/in/naman-v-shetty/",
        instagramUrl: "https://www.instagram.com/naman._.shetty/",
      },
      {
        name: "Aditya Naskar ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318420/IMG20241228174641_-_Aditya_Naskar_dthbsw.jpg",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318420/IMG20241228174641_-_Aditya_Naskar_dthbsw.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/aditya-naskar-0336a9257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/xx_adi.07/profilecard/?igsh=MXRwMGNhcmM1MGR3Yg==",
      },
      {
        name: "Ragini jaiswal ",
        role: "Control Systems Engineer",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1742318185/20250105_172424_-_Ragini_Jaiswal_1_yeqnz6.jpg",
        linkedinUrl: "https://www.linkedin.com/in/ragini-jaiswal-48a5002aa",
        instagramUrl: "ragini_sings",
      },
      {
        name: "Aakarsh Atluri  ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1742318411/Aakarsh1_-_Atluri_Aakarsh_bgtyyu.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/atluri-aakarsh-a08008320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/aakarsh_atluri/profilecard/?igsh=MXI2cTlhNmhxbnJsaA==",
      },
      {
        name: "Abhijeet Parmar   ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318404/IMG_20240906_224646_-_Abhijeet_Parmar_gu726k.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/abhijeet-parmar-a08696281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/abhijeet_parmar_05/profilecard/?igsh=eXptNjZtNGx3YnBk",
      },
    ],
    video: [
      {
        name: "K Bharath Varma",
        imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318591/IMG_5613_-_Varma_Kalidindi_glzoms.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/bharath-varma-kalidindi-8a1763280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        instagramUrl: "https://www.instagram.com/bharath__.__varma/profilecard/?igsh=aGlmcWtuOTEwN3Uw",
      },
      {
        name: "Sasi Kiran Pulapakura ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318569/Sasi_Kiran_Pulapakura_-_Sasi_Kiran_Pulapakura_yr2caw.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/sasi-kiran-pulapakura-3bab1b31b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/sasikiranpulapakhttps://www.instagram.com/hilori_jaiura",
      },
      {
        name: "Aditya Gandhra",
        imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318297/IMG_6758_-_Aditya_Gandhra_nr3ugu.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/adityagandhra?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        instagramUrl: "https://www.instagram.com/adityagandhra?igsh=MnZjdGVjeGtlcTQ4&utm_source=qr",
      },
      {
        name: "K Bharath Varma",
        imageUrl: "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318591/IMG_5613_-_Varma_Kalidindi_glzoms.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/bharath-varma-kalidindi-8a1763280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        instagramUrl: "https://www.instagram.com/bharath__.__varma/profilecard/?igsh=aGlmcWtuOTEwN3Uw",
      },
      {
        name: "Sasi Kiran Pulapakura ",
        imageUrl:
          "https://res.cloudinary.com/duir0ktqb/image/upload/v1742318569/Sasi_Kiran_Pulapakura_-_Sasi_Kiran_Pulapakura_yr2caw.jpg",
        linkedinUrl:
          "https://www.linkedin.com/in/sasi-kiran-pulapakura-3bab1b31b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagramUrl: "https://www.instagram.com/sasikiranpulapakhttps://www.instagram.com/hilori_jaiura",
      },
     
    ],
  }

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
  
  /* Animation classes */
  .fade-in-up {
    animation: fadeInUp 0.8s ease forwards;
    opacity: 0;
  }
  
  .slide-in-right {
    animation: slideInRight 0.8s ease forwards;
    opacity: 0;
  }
  
  .slide-in-left {
    animation: slideInLeft 0.8s ease forwards;
    opacity: 0;
  }
  
  .zoom-in {
    animation: zoomIn 0.8s ease forwards;
    opacity: 0;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* Glow effect */
  .glow-effect {
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.5);
    transition: box-shadow 0.3s ease;
  }
  
  .glow-effect:hover {
    box-shadow: 0 0 25px rgba(138, 43, 226, 0.8);
  }
  
  /* Neon text effect */
  .neon-text {
    text-shadow: 0 0 5px rgba(138, 43, 226, 0.5), 
                 0 0 10px rgba(138, 43, 226, 0.3), 
                 0 0 15px rgba(138, 43, 226, 0.2);
  }
  `

  return (
    <div className="relative z-0 ">
      <AnimatedWaveBackground style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }} />


      {/* Hero Section */}
      <div className="relative bg-black h-[650px] overflow-hidden">
  <div
    className="absolute inset-0 bg-contain bg-center opacity-30 z-10 lg:bg-cover"
    style={{
      backgroundImage: `url(${img})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
    role="img"
    aria-label="Team background image"
  ></div>

  <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
    <motion.h1
      className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 neon-text"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      Meet Our Team
    </motion.h1>

    <motion.p
      className="text-[#a70ff4] text-xl md:text-2xl lg:text-3xl mb-10 font-semibold"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      EESA IIT Indore
    </motion.p>
  </div>
</div>

      {/* President and Founder Section */}
      <section ref={sectionRefs.presidentFounder} className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMD<correct_response>
vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"
        ></div>

        <h2
          className={`text-4xl font-bold mb-20 text-white text-center relative z-10 neon-text ${isVisible.presidentFounder ? "zoom-in" : "opacity-0"}`}
        >
          Meet President and Founder
        </h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-4 relative z-10">
          {teamData.presidentFounder.map((member, index) => (
            <div
              key={member.id}
              className={`text-center ${isVisible.presidentFounder ? "fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.2 + index * 0.2}s` }}
            >
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-6 mx-auto overflow-hidden rounded-lg transition-all duration-500 hover:shadow-lg group glow-effect">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="p-4 w-full">
                    <div className="flex justify-center space-x-4 mb-2">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                      >
                        <Linkedin size={24} />
                      </a>
                      <a
                        href={member.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
                      >
                        <Instagram size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-white font-semibold text-xl mb-1">{member.name}</h3>
              <p className="text-purple-300 font-light">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Heads Section */}
      <section ref={sectionRefs.heads} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
        <h2
          className={`text-4xl font-bold mb-16 text-white text-center relative z-10 neon-text ${isVisible.heads ? "zoom-in" : "opacity-0"}`}
        >
          Meet Our Heads
        </h2>
        <div
          className={`px-12 relative z-10 ${isVisible.heads ? "fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.3s" }}
        >
          <Slider {...carouselSettings} className="py-8">
            {teamData.heads.map((member) => (
              <div key={member.id} className="text-center px-4">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 group glow-effect">
                  <img
                    src={member.imageUrl || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover bg-gray-200 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="p-4 w-full">
                      <div className="flex justify-center space-x-4 mb-2">
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                        >
                          <Linkedin size={24} />
                        </a>
                        <a
                          href={member.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
                        >
                          <Instagram size={24} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-white font-semibold text-lg md:text-xl">{member.name}</h3>
                <p className="text-purple-300 text-sm">{member.role}</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Teams Sections */}
      <WebTeamSection team={teamData.web} sectionRef={sectionRefs.web} isVisible={isVisible.web} />
      <DesignTeamSection team={teamData.design} sectionRef={sectionRefs.design} isVisible={isVisible.design} />
      <ContentTeamSection team={teamData.content} sectionRef={sectionRefs.content} isVisible={isVisible.content} />
      <AutonomyTeamSection team={teamData.autonomy} sectionRef={sectionRefs.autonomy} isVisible={isVisible.autonomy} />
      <VideoTeamSection team={teamData.video} sectionRef={sectionRefs.video} isVisible={isVisible.video} />

      <Footer />

      <style jsx>{customStyles}</style>
    </div>
  )
}

function WebTeamSection({ team, sectionRef, isVisible }) {
  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
      <h2
        className={`text-4xl font-bold mb-16 text-white text-center relative z-10 neon-text ${isVisible ? "zoom-in" : "opacity-0"}`}
      >
        Meet Our Web Team
      </h2>
      <div
        className={`px-12 relative z-10 ${isVisible ? "fade-in-up" : "opacity-0"}`}
        style={{ animationDelay: "0.3s" }}
      >
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 group glow-effect">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="p-4 w-full">
                    <div className="flex justify-center space-x-4 mb-2">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                      >
                        <Linkedin size={24} />
                      </a>
                      <a
                        href={member.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
                      >
                        <Instagram size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-white mb-2 font-semibold text-xl">{member.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}
//Events
function DesignTeamSection({ team, sectionRef, isVisible }) {
  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
      <h2
        className={`text-4xl font-bold mb-16 text-white text-center relative z-10 neon-text ${isVisible ? "zoom-in" : "opacity-0"}`}
      >
        Meet Our Events Team
      </h2>
      <div
        className={`px-12 relative z-10 ${isVisible ? "fade-in-up" : "opacity-0"}`}
        style={{ animationDelay: "0.3s" }}
      >
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 group glow-effect">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="p-4 w-full">
                    <div className="flex justify-center space-x-4 mb-2">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                      >
                        <Linkedin size={24} />
                      </a>
                      <a
                        href={member.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
                      >
                        <Instagram size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-white mb-2 font-semibold text-xl">{member.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

function ContentTeamSection({ team, sectionRef, isVisible }) {
  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
      <h2
        className={`text-4xl font-bold mb-16 text-white text-center relative z-10 neon-text ${isVisible ? "zoom-in" : "opacity-0"}`}
      >
        Meet Our Content and Social Media Team
      </h2>
      <div
        className={`px-12 relative z-10 ${isVisible ? "fade-in-up" : "opacity-0"}`}
        style={{ animationDelay: "0.3s" }}
      >
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 group glow-effect">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="p-4 w-full">
                    <div className="flex justify-center space-x-4 mb-2">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                      >
                        <Linkedin size={24} />
                      </a>
                      <a
                        href={member.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
                      >
                        <Instagram size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-white mb-2 font-semibold text-xl">{member.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

function AutonomyTeamSection({ team, sectionRef, isVisible }) {
  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
      <h2
        className={`text-4xl font-bold mb-16 text-white text-center relative z-10 neon-text ${isVisible ? "zoom-in" : "opacity-0"}`}
      >
        Meet Our Creatives Team
      </h2>
      <div
        className={`px-12 relative z-10 ${isVisible ? "fade-in-up" : "opacity-0"}`}
        style={{ animationDelay: "0.3s" }}
      >
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 group glow-effect">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="p-4 w-full">
                    <div className="flex justify-center space-x-4 mb-2">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                      >
                        <Linkedin size={24} />
                      </a>
                      <a
                        href={member.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
                      >
                        <Instagram size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-white mb-2 font-semibold text-xl">{member.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

function VideoTeamSection({ team, sectionRef, isVisible }) {
  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDkiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDA5IiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
      <h2
        className={`text-4xl font-bold mb-16 text-white text-center relative z-10 neon-text ${isVisible ? "zoom-in" : "opacity-0"}`}
      >
        Meet Our Video Production Team
      </h2>
      <div
        className={`px-12 relative z-10 ${isVisible ? "fade-in-up" : "opacity-0"}`}
        style={{ animationDelay: "0.3s" }}
      >
        <Slider {...carouselSettings} className="py-8">
          {team.map((member) => (
            <div key={member.name} className="text-center px-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-4 mx-auto overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 group glow-effect">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover bg-gray-200 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="p-4 w-full">
                    <div className="flex justify-center space-x-4 mb-2">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                      >
                        <Linkedin size={24} />
                      </a>
                      <a
                        href={member.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
                      >
                        <Instagram size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-white mb-2 font-semibold text-xl">{member.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

// function Footer() {
//   return (
//     <footer className="bg-[#13001A] text-white py-8 text-center relative z-10">
//       <div className="container mx-auto px-4">
//         <div className="mb-6">
//           <h3 className="text-2xl font-bold mb-4 neon-text">EESA IIT Indore</h3>
//           <p className="text-purple-300 max-w-md mx-auto">
//             Empowering students through innovation, technology, and community.
//           </p>
//         </div>
//         <div className="flex justify-center space-x-6 mb-6">
//           <a href="#" className="text-white hover:text-purple-400 transition-colors duration-300">
//             <Instagram size={24} />
//           </a>
//           <a href="#" className="text-white hover:text-purple-400 transition-colors duration-300">
//             <Linkedin size={24} />
//           </a>
//         </div>
//         <div className="text-sm text-gray-400">
//           &copy; {new Date().getFullYear()} EESA IIT Indore. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   )
// }

export default TeamPage

