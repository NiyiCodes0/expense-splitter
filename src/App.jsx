import { useState } from "react";

function App() {
  const [totalBill, setTotalBill] = useState(0);
  const [people, setPeople] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [error, setError] = useState("");

  // Calculate split amount
  const numPeople = people.length;
  const amountPerPerson = numPeople > 0 ? totalBill / numPeople : 0;

  const addPerson = () => {
    if (nameInput.trim() === "") {
      setError("Please enter a name");
      return;
    }
    setPeople([...people, nameInput.trim()]);
    setNameInput("");
    setError(""); // Clear error when successful
  };

  const clearAll = () => {
    setTotalBill(0);
    setPeople([]);
    setNameInput("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Expense Splitter
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Bill Amount
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={totalBill}
              onChange={(e) => setTotalBill(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add People
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Enter name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addPerson()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addPerson}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
              >
                Add
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          {/* Display list of people */}
          {people.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                People ({people.length})
              </p>
              <div className="space-y-2">
                {people.map((person, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                  >
                    <span className="text-gray-800">{person}</span>
                    <button
                      onClick={() =>
                        setPeople(people.filter((_, i) => i !== index))
                      }
                      className="text-red-500 hover:text-red-700 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(totalBill > 0 || people.length > 0) && (
            <button
              onClick={clearAll}
              className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
            >
              Clear All
            </button>
          )}
        </div>
        {totalBill > 0 && numPeople > 0 && (
          <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
            {people.map((person, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg mb-4"
              >
                <p className="text-sm text-gray-600">{`${person} pays `}</p>
                <p className="text-xl font-bold text-blue-600">
                  ${amountPerPerson.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
