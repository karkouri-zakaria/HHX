import { useState } from "react";
import From from "./To";
import To from "./From";

export default function Mail() {
  const [activeTab, setActiveTab] = useState("to");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div class="mail_card">
    <div class="inner_mail_card">
        <div class="tab-container">
        <button
            className={`tab ${activeTab === "to" ? "active" : ""}`}
            onClick={() => handleTabClick("to")}
        >
            Outbox
        </button>
        <button
            className={`tab ${activeTab === "from" ? "active" : ""}`}
            onClick={() => handleTabClick("from")}
        >
            Inbox
        </button>
        </div>
        <div class="tab-content-container">
        <div
            className={`tab-content ${activeTab === "to" ? "active" : ""}`}
        >
            <To />
        </div>
        <div
            className={`tab-content ${activeTab === "from" ? "active" : ""}`}
        >
            <From />
        </div>
        </div>
    </div>
    </div>
  );
}

