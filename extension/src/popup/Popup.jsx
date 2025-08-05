
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
    const res = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: selectedText })
    });
    const data = await res.json();
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

  return (
    <div className="p-4 w-96 text-sm font-sans space-y-4">
      <h1 className="text-lg font-bold text-center">SkillSnap AI</h1>
      <button onClick={extractText} className="btn">Extract Text</button>
      {selectedText && <textarea className="w-full h-24 border p-2" value={selectedText} readOnly />}
      <button onClick={analyzeText} className="btn">Analyze</button>
      <button onClick={clearData} className="btn-clear">Clear</button>
      {analysis && (
        <div className="border p-2 bg-gray-50">
          <strong>AI Analysis:</strong>
          <pre className="whitespace-pre-wrap">{analysis}</pre>
        </div>
      )}
      <div>
        <strong>History:</strong>
        <ul className="max-h-40 overflow-y-auto">
          {history.map((h, idx) => (
            <li key={idx} className="border-b py-1">
              <small>{h.timestamp}</small><br/>
              <em>{h.text.slice(0, 50)}...</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Popup;
