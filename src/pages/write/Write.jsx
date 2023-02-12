import { useContext, useState } from "react";
import "./write.css";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import CustomPopUp from "./../popup/CustomPopUp";

export default function Write() {
  const [sum, setSum] = useState(0);
  const [description, setDesc] = useState("");
  const [category, setcategory] = useState("");
  const { user } = useContext(Context);
  const [show, setshow] = useState(false);
  const [bodyPopUp, setbodyPopUp] = useState(false);

  // Sends a request to the server to create a new record
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newcost = {
      username: user.username,
      category,
      sum,
      description,
    };
    try {
      const res = await axiosInstance.post("/addcost", newcost);
      setbodyPopUp("Action has been included in your total expenses");
      setshow(true);
      document.getElementById("Category").value = "";
      document.getElementById("Sum").value = "";
      document.getElementById("Description").value = "";
      // window.location.replace("/cost/" + res.data._id);
    } catch (err) {
      setbodyPopUp("All fields must be filled");
      setshow(true);
    }
  };
  return (
    <div className="container-fluid">
      <div className="write">
        <span className="writeTitle">Add New Action</span>
        <img className="signupImg" src="https://img.freepik.com/premium-vector/money-cartoon-icon-set_152558-100.jpg?w=2000" alt="" />
        <form className="writeForm" onSubmit={handleSubmit}>
          <div style={{ textAlign: "center" }}>
            <select value={category} id="Category"
            type="text"
            onChange={(e) => setcategory(e.target.value)}>
            <option value="">Choose Category</option>
            <option value="Food">Food</option>
            <option value="Health">Health</option>
            <option value="Housing">Housing</option>
            <option value="Sport">Sport</option>
            <option value="Education">Education</option>
            <option value="Transportation">Transportation</option>
            <option value="Other">Other</option>
          </select>
            <input
              type="number"
              placeholder="Sum"
              id="Sum"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setSum(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              id="Description"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button className="writeSubmit" type="submit">
            Add to report
          </button>
        </form>
        {show && (
          <CustomPopUp
            title={"System Notice"}
            body={bodyPopUp}
            show={show}
            setShow={setshow}
          />
        )}
      </div>
    </div>
  );
}
