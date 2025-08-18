
import React, { useState, useEffect } from 'react';
import { saveHistory, getHistory, clearHistory } from '../utils/storage';
import './styles.css';

const Popup = () => {
  const [selectedText, setSelectedText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const extractText = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "extractText" }, (response) => {
        if (response?.text) setSelectedText(response.text);
      });
    });
  };

  const analyzeText = async () => {
    const res = await fetch("http://localhost:10000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: selectedText })
    });

    const data = await res.json();
    console.log("GPT Response:", data.result);

    setAnalysis(data.result);
    const entry = { text: selectedText, result: data.result, timestamp: data.timestamp };
    saveHistory(entry);
    setHistory(getHistory());
  };

  const clearData = () => {
    setSelectedText('');
    setAnalysis(null);
    clearHistory();
    setHistory([]);
  };

  const renderAnalysis = () => {
    try {
      const parsed = typeof analysis === 'string' ? JSON.parse(analysis) : analysis;
      return (
        <div className="border p-2 bg-gray-50">
          <strong>AI Analysis:</strong>
          <p className="font-semibold mt-2">Hard Skills:</p>
          <ul className="list-disc list-inside">
            {parsed.hard_skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
          <p className="font-semibold mt-2">Soft Skills:</p>
          <ul className="list-disc list-inside">
            {parsed.soft_skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </div>
      );
    } catch (e) {
      return (
        <div className="border p-2 bg-yellow-100 text-sm">
          ⚠️ Could not parse AI response.
          <pre className="whitespace-pre-wrap text-xs mt-1">{JSON.stringify(analysis, null, 2)}</pre>
        </div>
      );
    }
  };

  return (
    <div className="p-4 w-96 text-sm font-sans space-y-4">
      <h1 className="text-lg font-bold text-center">SkillSnap AI</h1>

      <button onClick={extractText} className="btn">Extract Text</button>
      {selectedText && <textarea className="w-full h-24 border p-2" value={selectedText} readOnly />}
      <button onClick={analyzeText} className="btn">Analyze</button>
      <button onClick={clearData} className="btn-clear">Clear</button>
      {analysis && renderAnalysis()}
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
