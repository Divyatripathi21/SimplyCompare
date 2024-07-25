import React from 'react'

export default function Dummy() {
  return (
    <div>
      Dummy
    </div>
  )
}

// import React, { useState, useEffect } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// function Result({ inputs }) {
//   const [loading, setLoading] = useState(true);
//   const [tableData, setTableData] = useState([]);
//   const [finalVerdict, setFinalVerdict] = useState("");
//   const [error, setError] = useState(null);
//   const genAI = new GoogleGenerativeAI(
//     "AIzaSyCijcZ2GoUwrUkI-j5EyVN1QE4DrQHmF5c"
//   );
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   useEffect(() => {
//     async function processPrompt() {
//       try {
//         const prompt = `
// I need a detailed comparison between two products: [Activa-5g] and [Activa-6g]. Please provide the comparison in the following text-based format:



// **Parameters:**



// 1. **Parameter Name:**

//   * **Fact 1:** [Fact about Parameter Name for Activa-5g]

//   * **Fact 2:** [Fact about Parameter Name for Activa-6g]

//   

// 2. **Parameter Name:**

//   * **Fact 1:** [Fact about Parameter Name for Activa-5g]

//   * **Fact 2:** [Fact about Parameter Name for Activa-6g]

//   

//   ... (repeat for additional parameters)



// **Final Verdict:**

// The final recommendation is [Activa-5g] or [Activa-6g].



// Please ensure that:

// - Each parameter starts with "**Parameter Name:**" followed by facts about both products.

// - Each fact is clearly stated and related to the parameter above.

// - The final verdict is clearly labeled as "**Final Verdict:**" with a recommendation for one of the two products.



// Maintain this format consistently to ensure that it can be easily parsed and displayed in a structured table format.





// and dont write anything extra just give the ouput as said



// and final verdict should be of one word only 

// and note paramters and facts you have to generate by yourself according to the given products

//         `;

//         const result = await model.generateContent(prompt);
//         const response = await result.response;

//         const text = await response.text();
//         console.log("Raw text:", text); // For debugging

//         // Extract parameters, facts, and verdict
//         const parameterRegex = /(\d+\.\s*[^:]+:)([\s\S]*?)(?=\d+\.\s*[^:]+:|\*\s*Final Verdict:|$)/g;
//         const verdictRegex = /\*\s*Final Verdict:\s*([^\n]+)/;

//         const parameters = [];
//         let match;

//         // Extract parameters and facts
//         while ((match = parameterRegex.exec(text)) !== null) {
//           const parameter = match[1].trim().replace(/^\d+\.\s*/, "").replace(/:$/, "");
//           const factsSection = match[2].trim();
//           const facts = factsSection.split(/\*\s*Fact \d+:\s*/).filter(fact => fact.trim());

//           parameters.push({
//             parameter,
//             facts
//           });
//         }

//         // Extract verdict
//         const verdictMatch = text.match(verdictRegex);
//         const verdict = verdictMatch ? verdictMatch[1].trim() : "";

//         // Format table data
//         const tableData = parameters.map(p => ({
//           parameter: p.parameter,
//           fact1: p.facts[0] || "",
//           fact2: p.facts[1] || "",
//           fact3: p.facts[2] || "",
//           fact4: p.facts[3] || "",
//         }));

//         setTableData(tableData);
//         setFinalVerdict(verdict);
//       } catch (error) {
//         console.error("Unexpected error:", error);
//         setError("An unexpected error occurred");
//       } finally {
//         setLoading(false);
//       }
//     }

//     processPrompt();
//   }, [inputs]);




/*
and dont write anything extra just give the ouput as said



and final verdict should be of one word only 

and note paramters and facts you have to generate by yourself according to the given products
*/