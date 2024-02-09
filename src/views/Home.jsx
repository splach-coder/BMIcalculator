import React from "react";
import Layout from "../Layouts/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const titleVariants = {
    visible: {
      opacity: 1,
      translateY: 0,
      transition: { duration: 0.5 },
    },
    hidden: { opacity: 0, translateY: -50, transition: { duration: 1000 } },
  };

  const paragraphVariants = {
    visible: {
      opacity: 1,
      translateY: 0,
      transition: { duration: 0.5 },
    },
    hidden: { opacity: 0, translateY: 50, transition: { duration: 1000 } },
  };

  const ButtonVariants = (value) => {
    return {
      visible: {
        opacity: 1,
        translateX: 0,
        transition: { duration: 0.5 },
      },
      hidden: { opacity: 0, translateX: value, transition: { duration: 1000 } },
    };
  };

  return (
    <Layout>
      <main className="flex flex-col justify-center items-center gap-5 min-h-[70vh]">
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className=" text-center">
          <span className="text-5xl text-black dark:text-white font-extrabold leading-relaxed ">
            Calculate your body <br /> mass index (BMI)
          </span>
        </motion.h1>

        <motion.p
          variants={paragraphVariants}
          initial="hidden"
          animate="visible"
          className="text-gray-800 text-xl dark:text-white">
          Check your BMI to find out if you're a healthy weight for your height.
        </motion.p>

        <div className="flex gap-5 mt-10">
          <motion.button
            variants={ButtonVariants(-100)}
            initial="hidden"
            animate="visible"
            className="w-[200px] py-5 rounded-md bg-purple-500 text-white font-semibold">
            <Link to="bmi/adults">Calculate for adults</Link>
          </motion.button>

          <motion.button
            variants={ButtonVariants(100)}
            initial="hidden"
            animate="visible"
            className="w-[200px] py-5 rounded-md bg-[#499BD9] text-white font-semibold">
            <Link to="bmi/teenagers">Calculate for teenagers</Link>
          </motion.button>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
