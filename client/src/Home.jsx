import React, { useEffect, useState } from "react";
import Quotes from "./components/Quotes";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [quotes, setQuotes] = useState([]);
  const [text, setText] = useState("");

  async function fetchQuotes() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/quotes`
      );
      if (res.data.success == true) {
        setQuotes(res.data.quotes);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function submithandle() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/quotes`,
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status == 201) {
        setQuotes((prevdata) => [...prevdata, res.data]);
        setText("");
        toast.success("Post uploaded sucessfully");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      //   console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="pt-20 font-merriweather">
      <div className="mb-14 border bg-white rounded-lg shadow-lg">
        <div className="mb-5 border-b p-4 font-semibold text-gray-600 bg-gray-50 rounded-t-lg">
          Create post
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submithandle();
          }}
        >
          <div className="p-4">
            <textarea
              className="w-full h-32 resize-none p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400 transition-all placeholder-gray-500"
              placeholder="What's on your mind?"
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
          >
            {" "}
            Post
          </button>
        </form>
      </div>

      {quotes.map((quote) => {
        return <Quotes key={quote._id} quote={quote} />;
      })}
    </div>
  );
};

export default Home;
