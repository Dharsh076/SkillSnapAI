import React, { useState, useEffect } from 'react';
import { saveHistory, getHistory, clearHistory } from './utils/storage';
import './styles.css';

const Popup = () => {
  const [selectedText, setSelectedText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false); // 👈 Loading state

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const extractText = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "extractText" }, (response) => {
        if (response?.text) {
          setSelectedText(response.text);
        }
      });
    });
  };

  const analyzeText = async () => {
    try {
      setLoading(true); // 👈 Start spinner
      const response = await fetch("https://skillsnapai-1.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: selectedText }),
      });

      const result = await response.json();
      if (result.hard_skills && result.soft_skills) {
        const newEntry = {
          timestamp: new Date().toLocaleString(),
          text: selectedText,
          hard_skills: result.hard_skills,
          soft_skills: result.soft_skills,
        };

        setAnalysis(result);
        const updatedHistory = [newEntry, ...history].slice(0, 5);
        setHistory(updatedHistory);
        saveHistory(updatedHistory);
      }
    } catch (error) {
      console.error("❌ Error analyzing text:", error);
    } finally {
      setLoading(false); // 👈 End spinner
    }
  };

  const clearData = () => {
    setSelectedText('');
    setAnalysis(null);
    clearHistory();
    setHistory([]);
  };

  return (
    <div className="p-4 w-[450px] h-[600px] overflow-y-auto text-sm font-sans space-y-4">
      <h1 className="text-xl font-bold text-center">SkillSnap AI</h1>

      <button onClick={extractText} className="btn">Extract Text</button>

      <textarea
        className="w-full h-24 border p-2"
        value={selectedText}
        placeholder="Extracted text will appear here..."
        readOnly
      />

      <button onClick={analyzeText} className="btn" disabled={!selectedText || loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      <button onClick={clearData} className="btn-clear">Clear</button>

      {loading && (
        <div className="text-center text-gray-500">🔍 Analyzing text, please wait...</div>
      )}

      {analysis && !loading && (
        <div className="space-y-2">
          <div className="border p-2 rounded bg-green-50">
            <h2 className="font-semibold">Hard Skills:</h2>
            <ul className="list-disc list-inside">
              {analysis.hard_skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </div>
          <div className="border p-2 rounded bg-blue-50">
            <h2 className="font-semibold">Soft Skills:</h2>
            <ul className="list-disc list-inside">
              {analysis.soft_skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </div>
        </div>
      )}

      <div>
        <strong>History:</strong>
        <ul className="max-h-40 overflow-y-auto text-xs">
          {history.map((h, idx) => (
            <li key={idx} className="border-b py-1">
              <small>{h.timestamp}</small><br />
              <em>{h.text.slice(0, 50)}...</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Popup;
