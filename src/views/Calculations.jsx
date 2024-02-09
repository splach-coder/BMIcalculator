import React, { useState, useEffect } from "react";
import Layout from "../Layouts/Layout";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import men from "../assets/svgs/men.svg";
import women from "../assets/svgs/women.svg";
import Spinner from "../components/Spinner/Spinner";

const Calculations = () => {
  const { type } = useParams();
  const [genderSelected, setGenderSelected] = useState(null);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [differance, setDifferance] = useState(0);

  const handleWeightChange = (e) => {
    const value = parseFloat(e.target.value);

    if (!isNaN(value)) setWeight(value);
  };

  const handleHeightChange = (e) => {
    const value = parseInt(e.target.value);

    if (!isNaN(value)) setHeight(value);
  };

  const handleGenderClick = (e) => {
    setGenderSelected(e.target.dataset.type);
  };

  const titleVariants = {
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    hidden: { opacity: 0, transition: { duration: 0.5 } },
  };

  const modalVariants = {
    visible: {
      opacity: 1,
      translateY: 0,
      transition: { duration: 0.3 },
    },
    hidden: { opacity: 0, translateY: -100, transition: { duration: 0.5 } },
  };

  const Overlay = () => {
    useEffect(() => {
      if (overlayOpen)
        setTimeout(() => {
          setLoading(false);
        }, 3000);
    }, [bmi]);

    const repeat = () => {
      setWeight(0);
      setHeight(0);
      setBmi(0);
      setOverlayOpen(false);
      setLoading(true);
      setResult("");
      setGenderSelected(null);
    };

    return (
      <div
        className={`absolute w-screen h-screen bg-opacity-70 bg-gray-800 left-0 top-0 ${
          overlayOpen ? "flex items-center justify-center" : "hidden"
        }`}>
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          className="w-[75%] mx-auto bg-white py-5 px-6 rounded-sm flex flex-col gap-10 items-center">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <motion.h1
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="text-center flex flex-col gap-5">
                <span className="text-3xl text-gray-800  font-semibold leading-relaxed ">
                  Your BMI is {bmi.toFixed(2)}
                </span>
                <span className="text-xl text-gray-600  font-semibold leading-relaxed ">
                  Your BMI is in the {result} category.
                </span>
              </motion.h1>

              <motion.div
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="text-center flex flex-col gap-5">
                {type === "teenagers" ? (
                  bmi < 5 || bmi >= 85 ? (
                    <span className="text-xl text-gray-600  font-semibold leading-relaxed ">
                      <strong className="text-bold text-red-500">Uh Oh!</strong>{" "}
                      <br />
                      You need to
                      {differance.toFixed(2) < 0
                        ? " Loss About " + differance.toFixed(2) * -1 + " KG "
                        : " Gain About " + differance.toFixed(2) + " KG "}
                      to be in the perfect shape.
                    </span>
                  ) : (
                    <span className="text-xl text-gray-600  font-semibold leading-relaxed">
                      {`your in ${
                        parseInt(differance) === 0.0
                          ? "perfect shape "
                          : "normal weight "
                      }`}

                      {parseInt(differance) !== 0 ? (
                        <span>
                          but if u want to get the perfect shape u need to
                          {differance.toFixed(2) < 0
                            ? " Loss About " +
                              differance.toFixed(2) * -1 +
                              " KG "
                            : " Gain About " + differance.toFixed(2) + " KG "}
                        </span>
                      ) : (
                        ""
                      )}
                    </span>
                  )
                ) : type === "adults" ? (
                  bmi < 18.5 || bmi >= 25 ? (
                    <span className="text-xl text-gray-600  font-semibold leading-relaxed ">
                      <strong className="text-bold text-red-500">Uh Oh!</strong>{" "}
                      <br />
                      You need to
                      {differance.toFixed(2) < 0
                        ? " Loss About " + differance.toFixed(2) * -1 + " KG "
                        : " Gain About " + differance.toFixed(2) + " KG "}
                      to be in the perfect shape.
                    </span>
                  ) : (
                    <span className="text-xl text-gray-600  font-semibold leading-relaxed">
                      {`your in ${
                        parseInt(differance) === 0.0
                          ? "perfect shape "
                          : "normal weight "
                      }`}

                      {parseInt(differance) !== 0 ? (
                        <span>
                          but if u want to get the perfect shape u need to
                          {differance.toFixed(2) < 0
                            ? " Loss About " +
                              differance.toFixed(2) * -1 +
                              " KG "
                            : " Gain About " + differance.toFixed(2) + " KG "}
                        </span>
                      ) : (
                        ""
                      )}
                    </span>
                  )
                ) : (
                  ""
                )}
              </motion.div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={repeat}
                className="w-[200px] py-3 rounded-md bg-gradient-to-br from-[#499BD9] to-purple-500  text-white font-semibold">
                Repeat
              </motion.button>
            </>
          )}
        </motion.div>
      </div>
    );
  };

  const calculateBMI = (weightKg, heightCm) => {
    if (weight === 0 || height === 0 || genderSelected === null) {
      return;
    }

    setOverlayOpen(true);
    setLoading(true);

    // Convert height from centimeters to meters
    let heightM = heightCm / 100;

    // Calculate BMI
    let bmi = weightKg / (heightM * heightM);

    setBmi(bmi);

    if (type === "teenagers") {
      if (genderSelected === "men") {
        if (bmi < 5) {
          setResult("Underweight");
        } else if (bmi >= 5 && bmi < 85) {
          setResult("Normal weight");
        } else if (bmi >= 85 && bmi < 95) {
          setResult("Overweight");
        } else {
          setResult("Obese");
        }
      } else if (genderSelected === "women") {
        if (bmi < 5) {
          setResult("Underweight");
        } else if (bmi >= 5 && bmi < 85) {
          setResult("Normal weight");
        } else if (bmi >= 85 && bmi < 95) {
          setResult("Overweight");
        } else {
          setResult("Obese");
        }
      }
    } else if (type === "adults") {
      if (bmi < 18.5) {
        setResult("Underweight");
      } else if (bmi >= 18.5 && bmi < 25) {
        setResult("Normal weight");
      } else if (bmi >= 25 && bmi < 30) {
        setResult("Overweight");
      } else {
        setResult("Obese");
      }
    }

    // Calculate target BMI within the normal weight range
    let targetBMI = (18.5 + 24.9) / 2;

    // Calculate weight difference needed to reach normal weight
    let weightDifference = (targetBMI - bmi) * heightM * heightM;

    setDifferance(weightDifference);
  };

  return (
    <Layout>
      <main className="flex flex-col md:items-center gap-10 pt-10 con">
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-center">
          <span className="text-lg md:text-3xl text-gray-800 dark:text-white font-semibold leading-relaxed ">
            Calculate your body mass index (BMI) <br /> for {type}:
          </span>
        </motion.h1>

        <div className="flex gap-5 items-center">
          <div className="">
            <span className="text-gray-700 dark:text-white md:font-semibold md:text-xl font-normal text-base ">
              Choose your Gender :
            </span>
          </div>

          <div className="flex gap-7">
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={handleGenderClick}
              data-type="men"
              className={
                "w-[75px] md:w-[100px] h-[75px] md:h-auto md:aspect-square rounded-md bg-[#499BD9] p-2 cursor-pointer flex flex-col items-center " +
                `${genderSelected === "men" ? "border-4 border-red-500" : ""}`
              }>
              <span
                data-type="men"
                onClick={handleGenderClick}
                className="md:font-semibold md:text-lg ">
                Men
              </span>
              <img
                data-type="men"
                onClick={handleGenderClick}
                src={men}
                className="w-10 h-10 md:w-auto md:h-auto"
                alt=""
              />
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={handleGenderClick}
              data-type="women"
              className={
                "w-[75px] md:w-[100px] h-[75px] md:h-auto md:aspect-square rounded-md bg-purple-500 p-2 cursor-pointer flex flex-col items-center " +
                `${genderSelected === "women" ? "border-4 border-red-500" : ""}`
              }>
              <span
                data-type="women"
                onClick={handleGenderClick}
                className="md:font-semibold md:text-lg">
                Women
              </span>
              <img
                className="w-10 h-10 md:w-auto md:h-auto"
                data-type="women"
                onClick={handleGenderClick}
                src={women}
                alt=""
              />
            </motion.div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-5">
          <div className="flex items-center w-[150px] md:w-[200px]">
            <span className="text-gray-700 dark:text-white md:font-semibold md:text-xl font-normal text-base ">
              Enter your weight:
            </span>
          </div>

          <div>
            <div className="flex gap-1 items-center">
              <input
                type="number"
                name="weight"
                onChange={handleWeightChange}
                value={weight}
                placeholder={0}
                min={0}
                className="w-[150px] md:w-auto px-3 py-2 bg-white dark:bg-gray-500 rounded-sm border border-gray-500 text-black dark:text-white"
              />
              <span className="text-gray-500 font-semibold ">KG</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-5">
          <div className="flex items-center  w-[150px] md:w-[200px]">
            <span className="text-gray-700 dark:text-white md:font-semibold md:text-xl font-normal text-base ">
              Enter your height:
            </span>
          </div>

          <div>
            <div className="flex gap-1 items-center">
              <input
                type="number"
                name="height"
                onChange={handleHeightChange}
                value={height}
                placeholder={0}
                min={0}
                className="w-[150px] md:w-auto  px-3 py-2 bg-white dark:bg-gray-500 rounded-sm border border-gray-500 text-black dark:text-white"
              />
              <span className="text-gray-500 font-semibold ">CM</span>
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => calculateBMI(weight, height)}
          className="w-[200px] py-5 rounded-md bg-gradient-to-br from-[#499BD9] to-purple-500  text-white font-semibold flex mx-auto text-center">
          <span className="text-center w-full">Calculate</span>
        </motion.button>
      </main>

      <Overlay />
    </Layout>
  );
};

export default Calculations;
