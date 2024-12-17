import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Quotes from "../components/Quotes";

const Profile = ({ user }) => {
  const [userQuotes, setUserQuotes] = useState([]);
  async function fetchData() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status == 200) {
        setUserQuotes(res.data.quotes);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function updateQuote(quoteData) {
    setUserQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote._id === quoteData._id ? quoteData : quote
      )
    );
  }

  function deleteQuote(quoteid) {
    setUserQuotes((prevQuotes) =>
      prevQuotes.filter((quote) => quote._id !== quoteid)
    );
  }

  return (
    <>
      {userQuotes.map((quote) => (
        <Quotes
          key={quote._id}
          updateQuote={updateQuote}
          user={user}
          quote={quote}
          deleteQuote={deleteQuote}
        />
      ))}
    </>
  );
};

export default Profile;
