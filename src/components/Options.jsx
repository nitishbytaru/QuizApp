import React from "react";

function Options({ options, selectedAnswer, setSelectedAnswer }) {
  return (
    <div>
      <ul className="grid grid-cols-2 text-xl">
        {options.map((res, index) => (
          <li
            key={index}
            className="text-blue bg-white rounded-xl p-2 m-2 border-2 border-black"
          >
            <div className="flex">
              <input
                type="radio"
                name="questionOptions"
                checked={selectedAnswer === res}
                className="mx-4"
                onChange={() => setSelectedAnswer(res)}
              />
              <p>{res}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Options;
