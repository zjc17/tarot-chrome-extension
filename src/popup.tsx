import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import './assets/styles/tailwind.css'
import cards from './data/cards.json'

const Popup = () => {
  const [card, setCard] = useState<Card>();
  useEffect(() => {
    const card_id = getTodayCardId();
    setCard(cards[card_id]);
  }, []);
  console.log('card', card);

  return (
    <div className="w-72 p-2">
      <header className="text-base text-black text-center">
        <h1 className="text-2xl font-bold">Tarot Arcana of the Day</h1>
        <p className="text-base">Raider Waite Tarot Deck</p>
      </header>
      <main className="flex">
        <div className="mx-auto my-4 flex flex-col">
          {card && (
            <>
              <img src={card.image} alt={card.name} />
              <span className="text-sm font-semibold text-center mx-auto py-1">
                {card.name}
              </span>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);

const getTodayCardId = (date = new Date().toLocaleDateString()): number => {
  const key = `card-${date}`;
  const value = localStorage.getItem(key);
  if (!value) {
    const card_id = Math.floor(Math.random() * 78);
    localStorage.setItem(key, card_id.toString());
    return card_id;
  }
  return parseInt(value);
};


const TestPopup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();

  useEffect(() => {
    chrome.action.setBadgeText({ text: count.toString() });
  }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: "#555555",
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
  };

  return (
    <>
      <ul style={{ minWidth: "700px" }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <button
        onClick={() => setCount(count + 1)}
        style={{ marginRight: "5px" }}
      >
        count up
      </button>
      <button onClick={changeBackground}>change background</button>
      <p className="text-red-500">Styled by TailwindCSS</p>
    </>
  );
};