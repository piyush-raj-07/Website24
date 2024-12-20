import React from "react";

const Activities = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-6 sm:p-12 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 animate-bgMove"
        style={{
          backgroundImage: "url('/animation.png')",
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900 to-black opacity-80 z-0"></div>
      <div className="relative z-10 w-full text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-semibold text-purple-800">
          Activities hu bhai
        </h1>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl gap-16">
        {/* Card 1 */}
        <div className="flex flex-col sm:flex-row w-full justify-between items-center sm:items-start gap-6">
          <div className="relative bg-black p-4 rounded-lg shadow-lg w-full sm:w-[60%] overflow-hidden h-[350px] max-w-lg">
            <div
              className="absolute top-4 left-4 w-[50%] h-[60%] overflow-hidden"
              style={{
                clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%)", 
              }}
            >
              <img
                src="/image.png"
                alt="Convocation"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg w-[60%]">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                CONVOCATION <span className="text-purple-400">2024</span>
              </h3>
              <p className="text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                ac quam nec mauris volutpat sollicitudin non eu sem.Vivamus
                ac quam nec mauris volutpat sollicitudin non eu sem.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col sm:flex-row-reverse w-full justify-between items-center sm:items-start gap-6">
          <div className="relative bg-black p-4 rounded-lg shadow-lg w-full sm:w-[60%] overflow-hidden h-[350px] max-w-lg">
            <div
              className="absolute top-4 left-4 w-[50%] h-[60%] overflow-hidden"
              style={{
                clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%)", 
              }}
            >
              <img
                src="/image.png"
                alt="Convocation"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg w-[60%]">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                CONVOCATION <span className="text-purple-400">2024</span>
              </h3>
              <p className="text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                ac quam nec mauris volutpat sollicitudin non eu sem.Vivamus
                ac quam nec mauris volutpat sollicitudin non eu sem.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col sm:flex-row w-full justify-between items-center sm:items-start gap-6">
          <div className="relative bg-black p-4 rounded-lg shadow-lg w-full sm:w-[60%] overflow-hidden h-[350px] max-w-lg">
            <div
              className="absolute top-4 left-4 w-[50%] h-[60%] overflow-hidden"
              style={{
                clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%)",
              }}
            >
              <img
                src="/image.png"
                alt="Convocation"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg w-[60%]">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                CONVOCATION <span className="text-purple-400">2024</span>
              </h3>
              <p className="text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                ac quam nec mauris volutpat sollicitudin non eu sem.Vivamus
                ac quam nec mauris volutpat sollicitudin non eu sem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
