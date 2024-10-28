'use client'
import { useEffect } from "react";
import axios from "axios";
import Section from "./components/Section";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast"; // Import toast from react-hot-toast
import AudioPlayer from "./components/AudioPlayer";
import Feature from "./components/feature";
import FeatureB from "./components/FeatureTwo";
import FAQ from "./components/Faq";
import { useMediaQuery } from "react-responsive";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { useGlobalContext } from "./Context/store";
import UserLayout from "./UserLayout"


const Home = () => {
  const { isAuthenticated, setisAuthenticated, logout, userId, setUserId, data, setData, DisplayName, setDisplayName, UserName, setUserName, Role, setRole, PackageId, setPackageId } = useGlobalContext();

  console.log("User id fetched from local host is : ", userId);
  const categories = [
    {
      img: "/assets/home/img6.PNG",
      title: "Text to Speech",
      des: "Text to Speech",
    },
    {
      img: "/assets/home/img7.PNG",
      title: "Text to Video",
      des: "Text to Video",
    },
    {
      img: "/assets/home/img8.PNG",
      title: "Video to Cartooni",
      des: "Video to Cartooni",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1100 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1100, min: 830 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 830, min: 650 },
      items: 3,
    },
    mdtablet: {
      breakpoint: { max: 650, min: 400 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 400, min: 0 },
      items: 1,
    },
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1220px)",
  });

  const isDesktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 900px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 600px)",
  });

  const isCarsial = useMediaQuery({
    query: "(max-width: 400px)",
  });
  const isLang = "eng";
  // useSelector((state) => state.authReducer.lang);
  const [pack, setPack] = useState(false);

  const polly = new PollyClient({
    region: process.env.NEXT_PUBLIC_REACT_APP_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_CLIENTID,
      secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_SECRETKEY,
    },
  });

  // AWS Polly Configuration
  // AWS.config.update({
  //   accessKeyId: process.env.REACT_APP_CLIENTID,
  //   secretAccessKey: process.env.REACT_APP_SECRETKEY,
  //   region: process.env.REACT_APP_REGION,
  // });

  // const polly = new AWS.Polly();

  const [text, setText] = useState("");
  const [audioFile, setAudioFile] = useState();

  // Expanded voices mapping by language and available voices for each language with gender
  const voices = {
    English: [
      { name: "Joanna (Female)", id: "Joanna", gender: "female" },
      { name: "Matthew (Male)", id: "Matthew", gender: "male" },
      { name: "Salli (Female)", id: "Salli", gender: "female" },
      { name: "Ivy (Female)", id: "Ivy", gender: "female" },
      { name: "Joey (Male)", id: "Joey", gender: "male" },
    ],
    Spanish: [
      { name: "Lucia (Female)", id: "Lucia", gender: "female" },
      { name: "Enrique (Male)", id: "Enrique", gender: "male" },
      { name: "Mia (Female)", id: "Mia", gender: "female" },
      { name: "Penelope (Female)", id: "Penelope", gender: "female" },
      { name: "Miguel (Male)", id: "Miguel", gender: "male" },
    ],
    French: [
      { name: "Lea (Female)", id: "Lea", gender: "female" },
      { name: "Celine (Female)", id: "Celine", gender: "female" },
      { name: "Mathieu (Male)", id: "Mathieu", gender: "male" },
    ],
    German: [
      { name: "Hans (Male)", id: "Hans", gender: "male" },
      { name: "Marlene (Female)", id: "Marlene", gender: "female" },
      { name: "Vicki (Female)", id: "Vicki", gender: "female" },
    ],
    Italian: [
      { name: "Carla (Female)", id: "Carla", gender: "female" },
      { name: "Bianca (Female)", id: "Bianca", gender: "female" },
      { name: "Giorgio (Male)", id: "Giorgio", gender: "male" },
    ],
    Japanese: [
      { name: "Mizuki (Female)", id: "Mizuki", gender: "female" },
      { name: "Takumi (Male)", id: "Takumi", gender: "male" },
    ],
    Portuguese: [
      { name: "Camila (Female)", id: "Camila", gender: "female" },
      { name: "Vitoria (Female)", id: "Vitoria", gender: "female" },
      { name: "Ricardo (Male)", id: "Ricardo", gender: "male" },
    ],
    Russian: [
      { name: "Tatyana (Female)", id: "Tatyana", gender: "female" },
      { name: "Maxim (Male)", id: "Maxim", gender: "male" },
    ],
    Dutch: [
      { name: "Lotte (Female)", id: "Lotte", gender: "female" },
      { name: "Ruben (Male)", id: "Ruben", gender: "male" },
    ],
    Danish: [
      { name: "Naja (Female)", id: "Naja", gender: "female" },
      { name: "Mads (Male)", id: "Mads", gender: "male" },
    ],
    Korean: [
      { name: "Seoyeon (Female)", id: "Seoyeon", gender: "female" },
    ],
    Turkish: [
      { name: "Filiz (Female)", id: "Filiz", gender: "female" },
    ],
    Polish: [
      { name: "Ewa (Female)", id: "Ewa", gender: "female" },
      { name: "Maja (Female)", id: "Maja", gender: "female" },
      { name: "Jacek (Male)", id: "Jacek", gender: "male" },
      { name: "Jan (Male)", id: "Jan", gender: "male" },
    ],
    Norwegian: [
      { name: "Liv (Female)", id: "Liv", gender: "female" },
    ],
    Swedish: [
      { name: "Astrid (Female)", id: "Astrid", gender: "female" },
    ],
    Arabic: [
      { name: "Zeina (Female)", id: "Zeina", gender: "female" },
    ],
  };

  const [selectedLanguage, setSelectedLanguage] = useState("English"); // Default language
  const [selectedVoice, setSelectedVoice] = useState(voices["English"][0].id); // Default voice

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    setSelectedLanguage(selectedLang);
    setSelectedVoice(voices[selectedLang][0].id); // Update voice to first available voice for selected language
  };

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
  };
  const convertTextToSpeech = async () => {
    console.log("New total characters are: ", newcharacter);
    try {
      const formdata = new FormData();
      formdata.append('userid', userId);
      formdata.append('characters', newcharacter);

      const command = new SynthesizeSpeechCommand({
        Text: text,
        OutputFormat: "mp3",
        VoiceId: selectedVoice,
      });
      const data = await polly.send(command);

      if (data && data.AudioStream) {
        setAudioFile(data); // Set the audio file to the state
        toast.success("Text converted to speech successfully!");

        // **Calculate used characters and update available characters**
        const charactersUsed = text.length;
        const remainingCharacters = useravailablecharacters - charactersUsed;

        if (remainingCharacters >= 0) {
          // Send update to the backend
          const updateFormData = new FormData();
          updateFormData.append('userid', userId);
          updateFormData.append('characters', charactersUsed); // Send the number of used characters

          const response = await axios.post(
            "https://aitools.pkstockhelper.info/api/updatesubscriptionsbyuserid(tts).php",
            updateFormData
          );

          if (response.data.status === "success") {
            const remainingCharacters = useravailablecharacters - charactersUsed;
            setuseravailablecharacters(remainingCharacters);  // Update the available characters in the UI
            console.log("Characters updated successfully");
          }

        }
      } else {
        console.error("No AudioStream in Polly response:", data);
        toast.error("Failed to convert text to speech.");
      }
    } catch (error) {
      console.error("Polly Error:", error);
      toast.error("Something went wrong with AWS Polly!");
    }
  };


  // const convertTextToSpeech = () => {
  //   polly.synthesizeSpeech(
  //     {
  //       Text: text,
  //       OutputFormat: "mp3",
  //       VoiceId: selectedVoice,
  //     },
  //     (error, data) => {
  //       if (error) {
  //         toast.error("Something went wrong!");
  //       } else {
  //         setAudioFile(data);
  //         toast.success("Text converted to speech successfully!");
  //       }
  //     }
  //   );
  // };
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("https://aitools.pkstockhelper.info/api/get_packages.php");
        setPackages(response.data);
        console.log(
          "All Packages are : ", response.data
        );
        setLoadingPackages(false);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Failed to load packages.");
        setLoadingPackages(false);
      }
    };

    fetchPackages();
  }, []);
  const [newcharacter, setnewcharacters] = useState('')
  const [useravailablecharacters, setuseravailablecharacters] = useState(3600);

  // Function to fetch subscription details based on userid (uid)
  const fetchSubscription = async () => {
    const formdata = new FormData();
    formdata.append('uid', userId);
    try {
      const response = await axios.post(
        "https://aitools.pkstockhelper.info/api/get_subscriptionbyuserid(tts).php", formdata
      );

      if (response.data.status === "success") {
        const characters = response.data.data[0]?.characters || 3600; // Set available characters from API or default to 3600
        setuseravailablecharacters(parseInt(characters, 10)); // Set available characters
        console.log("new avaibale characters are : ", useravailablecharacters)
      } else {
        console.error("Subscription fetch failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching subscription:", error);
    }
  };

  // Call the API when the component is mounted
  useEffect(() => {
    fetchSubscription();
  }, [userId]);


  return (
    <UserLayout>
      <div className="bg-white">

        <div className=" justify-center items-center grid grid-cols-2 gap-6 pt-10 mx-2 xl:mx-10">
          <div className="">
            <h1 className="text-[65px] ">
              <span
                className="text-[56px] uppercase sm:text-[42px] xl:text-[64px] font-[700] leading-[1.8]"
                style={{
                  backgroundClip: "text",
                  color: "transparent",
                  lineHeight: "2px",
                }}
              >
                <span className="text-blue-800 text-[65px] font-[900]">ADVANCE</span>
                <br />
                <span className="text-black">AI TOOLS</span>
              </span>{" "}
            </h1>
            <p className="xl:text-justify mt-6 text-gray-700 leading-relaxed">
              Discover the power of voice with our Text to Speech technology. Our
              platform transforms written content into natural-sounding speech,
              making information more accessible and engaging for everyone. Whether
              you're looking to bring your eBooks to life or make your articles
              more accessible, our solution is here to help.
              <br /><br />
              We pride ourselves on delivering high-quality audio output that
              captures the nuances of human speech. Our advanced algorithms ensure
              that the voice is not just clear, but also carries the right emotion
              and intonation. This makes our Text to Speech service perfect for
              creators, educators, and businesses aiming to enhance their audio
              content.
            </p>
          </div>

          <div className="">
            <div className=" bg-white pt-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="grid grid-cols-2 ">
                <div>
                  <div className=" px-8">
                    <label
                      htmlFor="languageSelect"
                      className="block text-medium font-semibold text-gray-700 mb-2"
                    >
                      Select Language:
                    </label>
                    <select
                      id="languageSelect"
                      value={selectedLanguage}
                      onChange={handleLanguageChange}
                      className="w-full p-2 rounded-xl border border-gray-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {Object.keys(voices).map((language) => (
                        <option key={language} value={language}>
                          {language}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>
                <div>
                  <div className="px-8">
                    <label
                      htmlFor="voiceSelect"
                      className="block text-medium font-semibold text-gray-700 mb-2"
                    >
                      Select Voice:
                    </label>
                    <select
                      id="voiceSelect"
                      value={selectedVoice}
                      onChange={handleVoiceChange}
                      className="w-full p-2 rounded-xl border border-gray-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {voices[selectedLanguage].map((voice) => (
                        <option key={voice.id} value={voice.id}>
                          {voice.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <Section
                text={text}
                setText={setText}
                convertTextToSpeech={convertTextToSpeech}
                availableCharacters={useravailablecharacters} // Pass the updated available characters here
                setnewtotalcharacters={setnewcharacters}
                uid={userId}
              />

              <Toaster position="top-right" reverseOrder={false} />
              <div className="">
                <AudioPlayer audioFile={audioFile} convertTextToSpeech={convertTextToSpeech} />
              </div>
            </div>
          </div>
        </div>


        {/* Other sections remain the same */}
        <section className="bg-white h-[80vh] py-8" >
          <h1 className="text-center text-3xl text-black m-5 font-bold">OUR SERVICES</h1>
          <div className={`flex justify-center space-x-8`}>
            <div
              className={`${isCarsial ? "w-[300px] m-auto" : "w-[300px]"} ${isLang !== "eng" ? "text-right text-[22px]" : ""
                } h-full block rounded-[22px] p-3 text-[#282828] border`}
            >
              {/* Use the fetched image directly in the src attribute */}
              <img
                className="w-full  rounded-t-[6px] object-cover"
                src="/assets/home/img6.PNG"
                alt={""}
              />
              <p className="text-[17px] text-[#262b33] font-[600] mt-5 ">
                {"Text to Speech"}
              </p>
              <p className="leading-4 mb-5 text-[12px] text-[#2b2b2b]">
                {"Text to Speech"}
              </p>
            </div>

            <div
              className={`${isCarsial ? "w-[300px] m-auto" : "w-[300px]"} ${isLang !== "eng" ? "text-right text-[22px]" : ""
                } h-full block rounded-[22px] p-3 text-[#282828] border`}
            >
              {/* Use the fetched image directly in the src attribute */}
              <img
                className="w-full  rounded-t-[6px] object-cover"
                src="/assets/home/img7.PNG"
                alt={""}
              />
              <p className="text-[17px] text-[#262b33] font-[600] mt-5 ">
                {"Text to Video"}
              </p>
              <p className="leading-4 mb-5 text-[12px] text-[#2b2b2b]">
                {"Text to Video"}
              </p>
            </div>

            <div
              className={`${isCarsial ? "w-[300px] m-auto" : "w-[300px]"} ${isLang !== "eng" ? "text-right text-[22px]" : ""
                } h-full block rounded-[22px] p-3 text-[#282828] border`}
            >
              {/* Use the fetched image directly in the src attribute */}
              <img
                className="w-full rounded-t-[6px] object-cover"
                src="/assets/home/img8.PNG"
                alt={""}
              />
              <p className="text-[17px] text-[#262b33] font-[600] mt-5 ">
                {"Image to Cartooni"}
              </p>
              <p className="leading-4 mb-5 text-[12px] text-[#2b2b2b]">
                {"Image to Cartooni"}
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Card
      <section style={{ maxWidth: "1400px", margin: "auto" }}>
        <div className="mt-[60px]  text-[#262b33]">
          <p className="text-center font-[600] text-[28px] ">
            A perfect fit for evertyone
          </p>
          <div className="flex justify-center mt-[25px]  ">
            <p
              style={{
                width: "clamp(300px,100%, 800px)",
                textAlign: "center",
                color: "#2b2b2b",
              }}
            >
              Elevate your marketing without financial stress. AI Advance Tool
              offers flexible pricing plans adjustable to businesses of all
              sizes. Choose the plan that aligns with your ambitions and witness
              your promotions mount to new heights.
            </p>
          </div>
        </div>
        <div className='flex justify-center mb-12 mt-8'>
            <div className='flex items-center bg-gray-200 rounded-lg overflow-hidden shadow-lg'>
              <button
                onClick={() => setPack(false)}
                className={`w-[200px] py-3 t px-3 text-lg font-semibold transition-all ${!pack ? 'bg-purple-600 text-white' : 'text-gray-700'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setPack(true)}
                className={`w-[200px] px-3 py-3 text-lg font-semibold transition-all ${pack ? 'bg-purple-600 text-white' : 'text-gray-700'}`}
              >
                Yearly
              </button>
            </div>
          </div>

        <div className="flex  justify-center gap-[15px] flex-wrap border-[rgba(57,76,96,.15)] ">
          {pack === false ? (
            <>
            {loadingPackages ? (<>
              Loading packages......
            </>):(<>
              <PricingCard
                color={"HSLA(0,100%,66%,1)"}
                hoverColor={"#fc4444"}
                text={"white"}
                title={packages[0].title}
                desc={packages[0].description}
                price={packages[0].mprice}
                duration ='month'
              />
              <PricingCard
                color={"HSLA(0,100%,66%,1)"}
                hoverColor={"#fc4444"}
                text={"white"}
                title={packages[1].title}
                desc={packages[1].description}
                price={packages[1].mprice}
                duration ='month'
              />
              <PricingCard
                color={"HSLA(0,100%,66%,1)"}
                hoverColor={"#fc4444"}
                text={"white"}
                title={packages[2].title}
                desc={packages[2].description}
                price={packages[2].mprice}
                duration ='month'
              />
            </>)}
            </>
          ) : (
            <>
               {loadingPackages ? (<>
            Loading packages......
            </>):(<>
              <PricingCard
                color={"HSLA(0,100%,66%,1)"}
                hoverColor={"#fc4444"}
                text={"white"}
                title={packages[0].title}
                desc={packages[0].description}
                price={packages[0].yprice}
                duration ='year'
              />
              <PricingCard
                color={"HSLA(0,100%,66%,1)"}
                hoverColor={"#fc4444"}
                text={"white"}
                title={packages[1].title}
                desc={packages[1].description}
                price={packages[1].yprice}
                duration ='year'
              />
              <PricingCard
                color={"HSLA(0,100%,66%,1)"}
                hoverColor={"#fc4444"}
                text={"white"}
                title={packages[2].title}
                desc={packages[2].description}
                price={packages[2].yprice}
                duration ='year'
              />
            </>)}
            </>
          )}
        </div> */}

        {/* <p className="text-[18px] text-center font-[500] mt-24 mb-16 text-black">
          <span className="text-[#0085FF] ">Our Subscribers</span> can enjoy
          premium AI ADVANCE TOOLS features for free
        </p>
      </section>
      Featucher Cards */}

        <section>
          <Feature
            img="/assets/home/img1.jpg"
            bg={"#5198EB22"}
            title={"Natural Text to Speech & AI Voice Generator"}
            description={
              "Let your content go beyond text with our realistic AI voices. Generate high-quality spoken audio in any voice, style, and language. Our AI voice generator is powered by an AI model that renders human intonation and inflections with unrivaled fidelity, adjusting the delivery based on context."
            }
            des2={
              "We pride ourselves on delivering high-quality audio output that captures the nuances of human speech. Our advanced algorithms ensure that the voice is not just clear, but also carries the right emotion and intonation. This makes our Text to Speech service perfect for creators, educators, and businesses aiming to enhance their audio content.  "
            }
            des3={
              "Getting started is as easy as typing. Simply input your text, choose your preferred voice, and let our technology do the rest. With support for multiple languages and a variety of voices, our platform is designed to cater to a global audience. Join us in breaking down barriers and making digital content audible and accessible to all.  "
            }
          />
        </section>

        <section>
          <FeatureB
            img="/assets/home/img2.jpg"
            bg={"#1717ff10"}
            title={"Convert Video to Cartooni"}
            description={
              "Bring your videos to life like never before with our Video to Animations service. Transform your traditional videos into vibrant animations that capture attention and imagination. Whether you're aiming to make educational content more fun or give your marketing materials a creative twist, our platform is your gateway to animation magic."
            }
            des2={
              "Our service is designed to be user-friendly, making the world of animation accessible to everyone. No need for advanced design skills—simply upload your video, and choose the animation style that fits your vision. Our technology handles the rest, turning your ideas into animated stories that resonate with audiences of all ages. "
            }
            des3={
              "Animating your videos has never been easier or more fun. Each animation is crafted to ensure your message isn't just seen but felt, with lively visuals that keep viewers engaged from start to finish. Perfect for businesses, educators, and creatives, our Video to Animations service helps you stand out in a crowded digital landscape. "
            }
          />
        </section>

        <section>
          <Feature
            img="/assets/home/img1.jpg"
            bg={"#5198EB22"}
            title={"Natural Text to Speech & AI Voice Generator"}
            description={
              "Step into the future of content creation with our Text to Video technology. Our platform effortlessly converts written narratives into captivating videos, merging text, images, and sound into a seamless viewing experience. Ideal for marketers, educators, and storytellers, our solution opens up a new realm of possibilities for digital content.  "
            }
            des2={
              "Our intuitive interface allows you to bring stories to life without the need for complex video editing skills. From dynamic visuals that match your message to professional-grade voiceovers, our technology ensures your content stands out. Elevate your brand or educational materials with videos that engage, inform, and entertain. "
            }
            des3={
              "Embrace the simplicity of creating videos from text. Input your script, select your preferred visuals and soundtrack, and watch as our platform transforms your words into a compelling video narrative. With support for various languages and customization options, reaching a global audience has never been easier. Join the revolution and make your content visually unforgettable. "
            }
          />
        </section>
        <section>
          <FAQ />
        </section>

        {/* <section>
        <Footer
          img="/assets/home/img2.jpg"
          bg={"#1717ff10"}
          title={"Convert Video to Cartooni Video"}
          description={
            "No more close with time-consuming design processes. AI Advance Tools4U streamlines creation, enabling you to generate perfact promotional content swiftly. Focus on strategic growth while ensuring your promotional materials set the standard."
          }
        />
      </section> */}
      </div>
    </UserLayout>
  );
};

export default Home;
