import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Timeline from "./timeline/Timeline"; // 새롭게 추가할 컴포넌트
import DirectMessages from "./DM/DirectMessages"
import "./App.css";

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route index element={<Timeline />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/DM" element={<DirectMessages />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
