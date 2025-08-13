import React, { useState, useEffect } from "react";
import "../css/AccessibilityWidget.css";
import accImg from '../assets/images/accessibility.png';

const featuresList = [
  { id: "biggerText", label: "Bigger Text", icon: "🔠", type: "level" },
  { id: "textSpacing", label: "Text Spacing", icon: "↔️", type: "level" },
  { id: "lineHeight", label: "Line Height", icon: "↕️", type: "level" },
  { id: "highlightLinks", label: "Highlight Links", icon: "🔗", type: "toggle" },
  { id: "dyslexiaFont", label: "Dyslexia Friendly", icon: "Df", type: "toggle" },
  { id: "hideImages", label: "Hide Images", icon: "🚫", type: "toggle" },
  { id: "bigCursor", label: "Cursor", icon: "🖱", type: "toggle" },
  { id: "invertColors", label: "Invert Colors", icon: "💧", type: "toggle" },
  { id: "textToSpeech", label: "Text to Speech", icon: "🔊", type: "toggle" },
];

const maxLevels = {
  biggerText: 4,
  textSpacing: 4,
  lineHeight: 4,
};

const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);
  const [features, setFeatures] = useState({});
  const [ttsEnabled, setTtsEnabled] = useState(false);

  // Load saved settings
  useEffect(() => {
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      setFeatures(JSON.parse(saved));
    }
  }, []);

  // Apply feature styles
  useEffect(() => {
    document.body.className = "";
    Object.keys(features).forEach((key) => {
      const value = features[key];
      if (value && key !== "textToSpeech") {
        if (typeof value === "number") {
          document.body.classList.add(`access-${key}-${value}`);
        } else if (value === true) {
          document.body.classList.add(`access-${key}`);
        }
      }
    });
    setTtsEnabled(features.textToSpeech || false);
    localStorage.setItem("accessibility-settings", JSON.stringify(features));
  }, [features]);

  // Text-to-Speech behavior
  useEffect(() => {
    const handleClick = (e) => {
      if (ttsEnabled) {
        const text = e.target.innerText || e.target.alt || "";
        if (text) {
          const utterance = new SpeechSynthesisUtterance(text);
          speechSynthesis.cancel();
          speechSynthesis.speak(utterance);
        }
      }
    };

    if (ttsEnabled) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }

    return () => document.removeEventListener("click", handleClick);
  }, [ttsEnabled]);

  const clearAllFeatures = () => {
    setFeatures({});
    localStorage.removeItem("accessibility-settings");
    document.body.className = "";
  };

  const toggleFeature = (id, type) => {
    setFeatures((prev) => {
      if (type === "level") {
        const current = prev[id] || 0;
        const next = (current + 1) % (maxLevels[id] + 1);
        return { ...prev, [id]: next };
      } else {
        return { ...prev, [id]: !prev[id] };
      }
    });
  };

  return (
    <>
      <button
        className="access-btn"
        aria-label="Accessibility options"
        onClick={() => setOpen(!open)}
      >
        <img src={accImg} alt="Accessibility Options" />
      </button>

      {/* {open && (
        <div className="access-panel">
          {featuresList.map((feat) => (
            <div
              key={feat.id}
              className={`access-item ${features[feat.id] ? "active" : ""
                }`}
              onClick={() => toggleFeature(feat.id, feat.type)}
              role="button"
              tabIndex={0}
            >
              <div className="access-icon">{feat.icon}</div>
              <div className="access-label">
                {feat.label}
                {feat.type === "level" && features[feat.id] > 0
                  ? ` (${features[feat.id]})`
                  : ""}
              </div>
            </div>
          ))}
          <div className="access-clear" onClick={clearAllFeatures}>
            Clear All
          </div>
        </div>
      )} */}
      {open && (
        <div className="access-panel">
          <div className="access-panel-header">
            <p>Accessibility Options</p>
            <button
              className="access-close"
              aria-label="Close accessibility panel"
              onClick={() => setOpen(false)}
            >
              ✖
            </button>
          </div>
          <div className="access-panel-content">
            {featuresList.map((feat) => (
              <div
                key={feat.id}
                className={`access-item ${features[feat.id] ? "active" : ""
                  }`}
                onClick={() => toggleFeature(feat.id, feat.type)}
                role="button"
                tabIndex={0}
              >
                <div className="access-icon">{feat.icon}</div>
                <div className="access-label">
                  {feat.label}
                  {feat.type === "level" && features[feat.id] > 0
                    ? ` (${features[feat.id]})`
                    : ""}
                </div>
              </div>
            ))}
          </div>
          <div className="access-clear" onClick={clearAllFeatures}>
            Clear All
          </div>
        </div>
      )}

    </>
  );
};

export default AccessibilityWidget;
