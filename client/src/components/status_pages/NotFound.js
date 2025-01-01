import React from 'react';
import styled from 'styled-components';

const NotFound = () => {


return(<>

<main class="h-screen w-full flex flex-col justify-center items-center bg-[#000000] mt-[-5rem]">
	<h1 class="text-9xl font-extrabold  text-white sm:text-[10rem] tracking-widest">404</h1>
	<div class="bg-[#c084fc] px-2 text-sm  sm:text-xl  rounded rotate-12 absolute">
		Page Not Found
	</div>
	<button class="mt-5">
      <a
        class="relative inline-block text-sm font-medium text-[#c084fc] group active:text-[#c084fc] focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#c084fc] group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
          <a href="/">Go Home</a>
        </span>
      </a>
    </button>
</main></>);
}
export default NotFound;