import { getDatabase, ref, set } from 'firebase/database';
import db from './firebase.js'; // Make sure this exports the Realtime Database

const plans = [
    { duration: "1 month", offer: "", price: "$1.49", amount: "1.49", type: "month", planCode: "1M" },
    { duration: "3 months", offer: "20% OFF", price: "$2.49", amount: "2.49", type: "month", planCode: "3M" },
    { duration: "12 months", offer: "40% OFF", price: "$4.99", amount: "4.99", type: "month", planCode: "12M" },
    { duration: "24 months", offer: "50% OFF", price: "$7.49", amount: "7.49", type: "month", planCode: "24M" },
    { duration: "Lifetime", offer: "USE FOREVER", price: "$9.99", amount: "9.99", type: "once", planCode: "LIFETIME" },
];


async function upload() {
  try {
    const rtdb = getDatabase(); // Get Realtime Database instance
    for (const plan of plans) {
      await set(ref(rtdb, `plans/${plan.planCode}`), plan);
    }
    console.log("Plans uploaded to Realtime Database!");
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

upload()