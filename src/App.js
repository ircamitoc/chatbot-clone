import { useState } from "react";
import "./App.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import axios from "axios";

// Constants for OpenAI API
const openaiBaseUrl = "https://api.openai.com/v1";
const apiKey = "your_api_key_here"; // Replace with your OpenAI API key

async function sendMsgToOpenAI(message) {
  try {
    const response = await axios.post(
      `${openaiBaseUrl}/engines/davinci/completions`,
      {
        prompt: message,
        max_tokens: 256,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].text;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am ChatGPT, a state-of-the-art language model",
      isBot: true,
    },
  ]);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);

    try {
      const res = await sendMsgToOpenAI(text);
      setMessages([...messages, { text: res, isBot: true }]);
    } catch (error) {
      console.error("OpenAI API error:", error);
      // Handle the error as needed
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button className="midBtn">
            <img src={addBtn} alt="new chat" className="addBtn" />
            New Chat
          </button>
          <div className="upperSideBottom">
            <button className="query">
              <img src={msgIcon} alt="Query" />
              What is Programming?
            </button>
            <button className="query">
              <img src={msgIcon} alt="Query" />
              How to use an API?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="" className="listItemsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="" className="listItemsImg" />
            Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="" className="listItemsImg" />
            Upgrade to Pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img
                className="chatimg"
                src={message.isBot ? gptImgLogo : userIcon}
                alt=""
              />
              <p className="txt">{message.text}</p>
            </div>
          ))}
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>
            ChatGPT may produce inaccurate information about people, places, or
            facts. ChatGPT August 20 version.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
