import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";

function Result({ inputs }) {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [finalVerdict, setFinalVerdict] = useState("");
  const [error, setError] = useState(null);
  const genAI = new GoogleGenerativeAI("AIzaSyDKppqxyiePMfsAapp-lGm4eG_ELqwwR6A");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const navigate=useNavigate();
  useEffect(() => {
    async function processPrompt() {
      try {
        const prompt = `
        I have a special request to you. Actually, I am using your API for my project which compares two
        products in the category of: ${inputs.category}.

        You have to find the comparison between these two products and respond in a specific format so that I can use the response in my project. Use the current data of the products availble online currently.

        The response format should strictly follow all the below given rules:

        1. Compare the products ${inputs.option1} and ${inputs.option2} these are modal or company name based on different parameters as much as required to come to a logical conclusion to choose one between them i.e what should i buy i have these two options only.
        
        2. My preference to compare these products is ${inputs.preferences}.
        
        3. Give the final verdict as verdict = any one of the products based on all the parameters and preferences.

        4. You have to give the response in text form, but that text should signify a table 
        with 3 columns:
        a. Parameters
        b. ${inputs.option1}
        c. ${inputs.option2}

        5. Give the table in text form  

        6. Use regex such that columns should be separated by astrik (*) 
        and new lines should be used for rows only. These two characters should not be used anywhere else.

        7. Give me what I asked for, nothing else. Don't write anything extra, just give the table content in the form of text and the final verdict based on all the parameters.

         8.For Prices take current prices or approx prices of the product from online.
        
        9.Don't use bold for anything keep it simple and plain text 
        

        10.also note use atleat 5-10 different paramters to compare the products using current data

        11.use paramters in which product specification is different .
        12.for finaly verdict please give only in format or in this way only 
        verdict=(name) 
        the 'v' of verdict should be in small letters always

        dont follow anything else to give verdict no space nothing 

        12.Strictly follow all the above points and give the response in the specified format.

        
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        const text = await response.text();
        console.log("Raw text:", text); // For debugging

        // Extract rows and columns
        const rows = text.split("\n").filter(row => row.trim());

        // Separate "Verdict" row from the rest
        let verdictRow = rows.find(row => row.startsWith("verdict"));
        const tableRows = rows.filter(row => !row.startsWith("verdict"));
          if(!verdictRow)
             verdictRow = rows.find(row => row.startsWith("Verdict"));
        // Remove duplicate header rows
        const headerRow = tableRows[0];
        const uniqueTableRows = tableRows.filter(row => row !== headerRow);

        // Map table rows excluding the "Verdict" row
        const tableData = uniqueTableRows.map(row => {
          const columns = row.split("*");
          return {
            parameter: columns[0],
            option1: columns[1],
            option2: columns[2],
          };
        });

        let finalVerdict = verdictRow ? verdictRow.split("=")[1] : "";
      
     

        setTableData(tableData);
        setFinalVerdict(finalVerdict);
      } catch (error) {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    processPrompt();
  }, [inputs]);

  const handleCross=()=>{
    navigate('/');
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-white border border-gray-300 shadow-lg rounded-lg p-6 w-11/12 max-w-4xl">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-4xl"
        onClick={handleCross}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Generated Result</h2>
        {loading ? (
          <div className="text-center font-serif font-bold ">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="text-gray-800">
            <h1 className="text-lg font-bold mb-2">Comparison Table</h1>
            <div className="overflow-x-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-900  uppercase tracking-wider">
                      Parameter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                      {inputs.option1}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold  text-gray-900 uppercase tracking-wider">
                      {inputs.option2}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.parameter}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.option1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.option2}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-lg font-bold">Verdict:</h2>
              <span className="block text-2xl font-bold text-red-600 mt-2">
                {finalVerdict}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
  