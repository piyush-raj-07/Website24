import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <div className=" ">
      <StyledWrapper>
        <div class="loader">
          <svg
            viewBox="0 0 16 16"
            class="light bi bi-lightning-charge-fill"
            fill="currentColor"
            height="28"
            width="28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"></path>
          </svg>
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .light {
    position: absolute;
    left: 22px;
    fill: rgba(37, 37, 37, 0.774);
  }

  .loader {
    width: 80px;
    height: 40px;
    border: 2px solid #c084fc;
    border-right-color: transparent;
    padding: 3px;
    background: repeating-linear-gradient(90deg, #c084fc 0 10px, #0000 0 15px)
      left/0% 100% no-repeat content-box content-box;
    position: relative;
    animation: p5 2s infinite steps(6);
    scale:2;
  }
  .loader::before {
    content: "";
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: 100%;
    width: 10px;
    background: linear-gradient(
          #0000 calc(50% - 7px),
          #c084fc 0 calc(50% - 5px),
          #0000 0 calc(50% + 5px),
          #c084fc 0 calc(50% + 7px),
          #0000 0
        )
        left / 100% 100%,
      linear-gradient(
          #c084fc calc(50% - 5px),
          #0000 0 calc(50% + 5px),
          #c084fc 0
        )
        left / 2px 100%,
      linear-gradient(#0000 calc(50% - 5px), #c084fc 0 calc(50% + 5px), #0000 0)
        right/2px 100%;
    background-repeat: no-repeat;
  }
  @keyframes p5 {
    100% {
      background-size: 120% 100%;
    }
  }
`;

export default Loader;
