"use client";
import React from "react";


const AboutUs = () => {
  return (
    <div className="font-raleway bg-white">

      <div className="">
        {/* Section 1: Our Story */}
        <div className="bg-beige w-full">
          <section className=" container mx-auto px-10 flex flex-col md:flex-row items-stretch">
            <div className="md:w-1/2 p-10 md:p-24 flex flex-col justify-center">
              <h2 className="text-4xl font-serif text-gray-800 mb-6">
                Our <span className="font-bold">Story</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base max-w-lg">
                Seoul Mirage was born from a passion for Korean skincare
                innovation and a commitment to creating luxury products that
                deliver exceptional results.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/about/about1.jpg"
                alt="Story"
                className="w-full h-full object-cover min-h-[400px]"
              />
            </div>
          </section>
        </div>

        {/* Section 2: Our Journey */}
        
            <section className="container mx-auto px-10 flex flex-col-reverse md:flex-row items-stretch">
          <div className="md:w-1/2">
            <img
              src="/images/about/about2.jpg"
              alt="Journey"
              className="w-full h-full object-cover min-h-[400px]"
            />
          </div>
          <div className="md:w-1/2 p-10 md:p-24 flex flex-col justify-center">
            <h2 className="text-4xl font-serif text-gray-800 mb-6">
              Our Journey
            </h2>
            <div className="text-gray-600 space-y-4 text-sm md:text-base max-w-lg leading-relaxed">
              <p>
                Founded in 2018 by skincare enthusiast and biochemist Dr.
                Ji-Yoon Park, Seoul Mirage began as a small laboratory in the
                heart of Seoul’s beauty district.
              </p>
              <p>
                What started as a passion project quickly gained recognition for
                its exceptional quality and remarkable results. Today, Seoul
                Mirage has grown into a global brand.
              </p>
            </div>
          </div>
        </section>
       

        {/* Section 3: Our Philosophy */}
        <section className=" bg-white">
         <div className="container mx-auto flex flex-col md:flex-row items-stretch"> 
           <div className="md:w-1/2 p-10 md:p-24 flex flex-col justify-center">
            <h2 className="text-4xl font-serif text-gray-800 mb-6">
              Our Philosophy
            </h2>
            <p className="text-gray-600 mb-8 text-sm leading-relaxed max-w-lg">
              Founded in 2018 by skincare enthusiast and biochemist Dr. Ji-Yoon
              Park, Seoul Mirage began as a small laboratory...
            </p>
            {/* Features with Borders */}
            <div className="space-y-6">
              {["Purity", "Innovation", "Sustainability"].map((item) => (
                <div key={item} className="border-l-2 border-black pl-6">
                  <h4 className="font-bold text-lg mb-1">{item}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We source the highest quality ingredients and maintain
                    rigorous standards to ensure our products are free from
                    harmful chemicals.
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/images/about/about3.jpg"
              alt="Philosophy"
              className="w-full h-full object-cover min-h-125"
            />
          </div>
         </div>
        </section>

        {/* Section 4: Our Ingredients */}
        <section className="py-20 text-center bg-[#f2e9d9]">
          <div className="container mx-auto px-10">
            <h2 className="text-3xl font-serif mb-4">Our Ingredients</h2>
          <p className="text-xs text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            We believe in the power of nature enhanced by science. Our
            formulations combine time-honored Korean botanical ingredients with
            advanced scientific compounds.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Botanical Extracts",
                img: "/images/about/about4.jpg",
              },
              {
                title: "Fermented Ingredients",
                img: "/images/about/about5.jpg",
              },
              {
                title: "Scientific Compounds",
                img: "/images/about/about6.jpg",
              },
            ].map((item, index) => (
              <div key={index} className="relative h-64 overflow-hidden group">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-left">
                  <h4 className="text-white font-bold text-sm mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-gray-200 leading-tight">
                    From ginseng to green tea, our products harness the power of
                    traditional Korean botanicals.
                  </p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>
      </div>

    </div>
  );
};

export default AboutUs;