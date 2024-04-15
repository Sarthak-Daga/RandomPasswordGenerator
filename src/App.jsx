import { useState, useCallback  ,useEffect , useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");
  const passref = useRef(null)
  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    if (numbers) str += "1234567890";
    if (characters) str += '!@#$%^&*()_+-={}|[]\\:;"<>?,./`~';

    for (let i = 0; i < length; ++i) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbers, characters]);

  useEffect(passwordGen,[length, numbers, characters])

  const copytoclip=useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  },[password])



  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center text-4xl mb-10">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 mb-5"
          placeholder="Password"
          readOnly
          ref={passref}
        />
        <button
        onClick={copytoclip}
          className="text-white outline-none py-1 px-3 mb-5 shrink-0"
          style={{ backgroundColor: "blue" }}
        >
          Copy
        </button>
      </div>

      <div className="flex items-center gap-x-2">
        <input
          type="range"
          min={6}
          max={20}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="cursor-pointer"
        />
        <label className="text-white">Length: {length}</label>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numbers}
            id="numberInput"
            onChange={() => {
              setNumbers((prev) => !prev);
            }}
          />
          <label>Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={characters}
            id="characterinput"
            onChange={() => {
              setCharacters((prev) => !prev);
            }}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
