import { useState } from "react";
//import "./styles.css";
 
function Test() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");

  const addToList = () => {
    let tempArr = list;
    // tempArr.push(value);
    setList(tempArr);
    setValue("");
  };

  const deleteItem = (index: number) => {
    let temp = list.filter((_item, i) => i !== index);
    setList(temp);
  };

  return (
    <div className="App">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />{" "}
      <button onClick={addToList}> Click to Add </button>
      <ul>
        {list.length > 0 &&
          list.map((item, i) => <li onClick={() => deleteItem(i)}>{item} </li>)}

      </ul>

    </div>

  );

}

 

export default Test;