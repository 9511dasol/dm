import React from 'react'
import "./Story.css"
import { Avatar } from "@mui/material";

function Story() {
  return (
    <div className='timeline__story'>
        <div className='story__user'>
            <Avatar>R</Avatar>
            <div className='user__name'>Name</div>
        </div>
        <div className='story__user'>
            <Avatar>R</Avatar>
            <div className='user__name'>Name</div>
        </div>
        <div className='story__user'>
            <Avatar>R</Avatar>
            <div className='user__name'>Name</div>
        </div>
        <div className='story__user'>
            <Avatar>R</Avatar>
            <div className='user__name'>Name</div>
        </div>
        <div className='story__user'>
            <Avatar>R</Avatar>
            <div className='user__name'>Name</div>
        </div>
        <div className='story__user'>
            <Avatar>R</Avatar>
            <div className='user__name'>Name</div>
        </div>
       
    </div>
  )
}

export default Story