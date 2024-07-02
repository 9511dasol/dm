import React from "react";
import "./Suggesstions.css";
import { Avatar } from "@mui/material";
function Suggesstions() {
  return (
    <div className="sugesstions">
      <div className="sugesstions__title">Suggesstions for you</div>
      <div className="sugesstions__usernames">
        
        <div className="sugesstion_username">
          <div className="username_left">
            <span className="avatar">
              <Avatar>R</Avatar>
            </span>
            <div className="username__info">
              <span className="username">redian_</span>
              <span className="relation">Now to instagram</span>
            </div>
          </div>
          <button className="follow__button">Follow</button>
        </div>

        <div className="sugesstion_username">
          <div className="username_left">
            <span className="avatar">
              <Avatar>R</Avatar>
            </span>
            <div className="username__info">
              <span className="username">redian_</span>
              <span className="relation">Now to instagram</span>
            </div>
          </div>
          <button className="follow__button">Follow</button>
        </div>

        <div className="sugesstion_username">
          <div className="username_left">
            <span className="avatar">
              <Avatar>R</Avatar>
            </span>
            <div className="username__info">
              <span className="username">redian_</span>
              <span className="relation">Now to instagram</span>
            </div>
          </div>
          <button className="follow__button">Follow</button>
        </div>

        <div className="sugesstion_username">
          <div className="username_left">
            <span className="avatar">
              <Avatar>R</Avatar>
            </span>
            <div className="username__info">
              <span className="username">redian_</span>
              <span className="relation">Now to instagram</span>
            </div>
          </div>
          <button className="follow__button">Follow</button>
        </div>

      </div>
    </div>
  );
}

export default Suggesstions;
