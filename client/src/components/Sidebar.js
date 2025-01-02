import React from "react";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <>
      <CSSWrapper>
        <nav>
          <ul>
            <li>
              <div class="home-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="size-8"
                >
                  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
              </div>
            </li>
            <li>
              <div class="about-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  class="size-8"
                >
                  <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
                </svg>
              </div>
            </li>
            <li>
              <div class="work-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  class="size-8"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </li>
            <li>
              <div class="mail-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  class="size-8"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </div>
            </li>
          </ul>
        </nav>
      </CSSWrapper>
    </>
  );
};

const CSSWrapper = styled.div`
*,*:before,*:after {
	box-sizing: border-box;
}

:after {
	content: "";
}

nav {
  float: left;
	position: relative;
	top: 10rem;
  left: 0;
	background: transparent;
  z-index: 10
}

nav ul {
	text-align: center;
}

nav ul li {
	position: relative;
  width: 70px;
  cursor: pointer;
	background: #c084fc;
	text-transform: uppercase;
	transition:all .4s ease-out;
}

nav ul li:after {
	position: absolute;
	background: white;
	color: #c084fc;
	top:0;
	left: 70px;
	width: 70px; height: 100%;
  opacity:.5;
  transform: perspective(400px) rotateY(90deg);
	transform-origin: 0 100%;
	transition:all .4s ease-out;
  font-weight:700;

  display: flex;
  justify-content: center;
  align-items: center;
}

nav ul li:nth-child(1):after { 
	content: "Home";
	line-height: 88px;
}
nav ul li:nth-child(2):after { 
	content: "Play";
	line-height: 88px;
}
nav ul li:nth-child(3):after { 
	content: "Gallery";
	line-height: 88px;
}
nav ul li:nth-child(4):after { 
	content: "Say hi!";
	line-height: 88px;
}

nav ul li:hover {
	transform: translateX(-70px);
}

nav ul li:hover:after {
  opacity: 1;
	transform: perspective(400px) rotateY(0deg) scale(1) ;
}


nav ul li > div {
	display: inline-block;
	padding: 25px 0;
	background: transparent;
}

nav ul li div { position: relative; }

}

@media (max-width: 768px) {

  nav ul {
    flex-direction: column;
    align-items: center;
  }

  nav ul li {
    width: 50px;
    height: 50px;
  }

  nav ul li:after {
    width: 50px;
    line-height: 50px;
  }
  .mail-icon{
     top:-15px;
  }
  .work-icon{
   top:-15px;
  }
  .about-icon{
   top:-15px;
  }
  .home-icon{
   top:-15px;
  }
  
}

@media (max-width: 480px) {

  nav ul li {
    width: 40px;
    height: 40px;
  }

  nav ul li:after {
    width: 40px;
  }

  nav ul {
    gap: 10px;
  }

  .mail-icon{
     top:-25px;
  }
  .work-icon{
   top:-25px;
  }
  .about-icon{
   top:-25px;
  }
  .home-icon{
   top:-25px;
  }
    
}

}`;
export default Sidebar;
