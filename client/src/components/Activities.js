import React from "react";

const Activities = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-6 sm:p-12 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 animate-bgMove"
        style={{
          backgroundImage: "url('/animation1.png')",
        }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
      <div className="relative z-10 w-full text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-semibold text-purple-800"> Nothing </h1>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl gap-16">
        {/* Card 1 */}
        <div className="flex flex-col sm:flex-row w-full justify-between items-center sm:items-start gap-6">
          <div className="relative p-4 rounded-lg shadow-lg w-full sm:w-[60%] overflow-hidden h-[350px] max-w-lg">
            <div className="absolute top-4 left-4 w-[60%] h-[70%] overflow-hidden group">
              {/* Purple angled border */}
              <div
                className="w-full h-full relative"
                style={{
                  position: 'relative',
                  paddingLeft: '10px',
                  paddingTop: '2px',
                }}
              >
                {/* Angled Purple Border using pseudo-element */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, transparent 10%, #9F7AEA 10%, #9F7AEA 80%, transparent 80%)`,
                    zIndex: -1,
                  }}
                ></div>

                {/* Image with mask (cropped to 20%) */}
                <div
                  className="w-full h-full"
                  style={{
                    maskImage: "linear-gradient(135deg, transparent 10%, black 10%)",
                    WebkitMaskImage: "linear-gradient(135deg, transparent 10%, black 10%)",
                    borderTop: '2px solid #9F7AEA'
                  }}
                >
                  <img
                    src="/image.png"
                    alt="Convocation"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <a
                  href="https://www.instagram.com/eesa_iiti/p/DAdeUhQuQfd/?img_index=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full font-semibold hover:bg-black transition-colors duration-300"
                >
                  <img src="/insta.jpeg" alt="Instagram" className="w-5 h-5" />
                  <span>visit @EESA for more..</span>
                </a>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-opacity-75 text-white p-4 rounded-lg w-[60%]">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                CONVOCATION <span className="text-purple-400">2024</span>
              </h3>
              <p className="text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                ac quam nec mauris volutpat sollicitudin non eu sem. Lorem ipsum dolor sit, consectetur adipiscing.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col sm:flex-row-reverse w-full justify-between items-center sm:items-start gap-6">
          <div className="relative p-4 rounded-lg shadow-lg w-full sm:w-[60%] overflow-hidden h-[350px] max-w-lg">
            <div className="absolute top-4 left-4 w-[60%] h-[70%] overflow-hidden group">
              {/* Purple angled border */}
              <div
                className="w-full h-full relative"
                style={{
                  position: 'relative',
                  paddingLeft: '10px',
                  paddingTop: '2px',
                }}
              >
                {/* Angled Purple Border using pseudo-element */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, transparent 10%, #9F7AEA 10%, #9F7AEA 80%, transparent 80%)`,
                    zIndex: -1,
                  }}
                ></div>

                {/* Image with mask (cropped to 20%) */}
                <div
                  className="w-full h-full"
                  style={{
                    maskImage: "linear-gradient(135deg, transparent 10%, black 10%)",
                    WebkitMaskImage: "linear-gradient(135deg, transparent 10%, black 10%)",
                    borderTop: '2px solid #9F7AEA'
                  }}
                >
                  <img
                    src="/image.png"
                    alt="Farewell"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <a
                  href="https://www.instagram.com/eesa_iiti/p/DCCU7lQTmJf/?img_index=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full font-semibold hover:bg-black transition-colors duration-300"
                >
                  <img src="/insta.jpeg" alt="Instagram" className="w-5 h-5" />
                  <span>visit @EESA for more..</span>
                </a>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-opacity-75 text-white p-4 rounded-lg w-[60%]">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                FAREWELL <span className="text-purple-400">2024</span>
              </h3>
              <p className="text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                ac quam nec mauris volutpat sollicitudin non eu sem. Lorem ipsum dolor sit, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col sm:flex-row w-full justify-between items-center sm:items-start gap-6">
          <div className="relative p-4 rounded-lg shadow-lg w-full sm:w-[60%] overflow-hidden h-[350px] max-w-lg">
            <div className="absolute top-4 left-4 w-[60%] h-[70%] overflow-hidden group">
              {/* Purple angled border */}
              <div
                className="w-full h-full relative"
                style={{
                  position: 'relative',
                  paddingLeft: '10px',
                  paddingTop: '2px',
                }}
              >
                {/* Angled Purple Border using pseudo-element */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, transparent 10%, #9F7AEA 10%, #9F7AEA 80%, transparent 80%)`,
                    zIndex: -1,
                  }}
                ></div>

                {/* Image with mask (cropped to 20%) */}
                <div
                  className="w-full h-full"
                  style={{
                    maskImage: "linear-gradient(135deg, transparent 10%, black 10%)",
                    WebkitMaskImage: "linear-gradient(135deg, transparent 10%, black 10%)",
                    borderTop: '2px solid #9F7AEA'
                  }}
                >
                  <img
                    src="/image.png"
                    alt="Cultural Fest"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <a
                  href="https://instagram.com/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full font-semibold hover:bg-black transition-colors duration-300"
                >
                  <img src="/insta.jpeg" alt="Instagram" className="w-5 h-5" />
                  <span>visit @EESA for more..</span>
                </a>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-opacity-75 text-white p-4 rounded-lg w-[60%]">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                CULTURAL <span className="text-purple-400">FEST</span>
              </h3>
              <p className="text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                ac quam nec mauris volutpat sollicitudin non eu sem. Lorem ipsum dolor sit, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
