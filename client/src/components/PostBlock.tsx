import React, { useEffect, useState } from 'react'
import more from '../assets/more.svg';
import UpRate from '../assets/upRate.svg?react';
import DownRate from '../assets/downRate.svg?react';
import Comment from '../assets/comment.svg?react';
import Share from '../assets/share.svg?react';
import './styles/postBlock.css'
import { placeholderImage, serverUrl } from '../consts/consts'
import axios from 'axios';
import { useAppSelector } from '../types/reduxTypes';

interface PostProps{
  dataLink:string,
  title:string,
  description:string,
  karma:number,
  communityId: number,
  createdAt:string
}

export default function PostBlock({createdAt, communityId, karma, dataLink, title,description}:PostProps) {
  const [communityTitle,setCommunityTitle] = useState("");
  const [timeLast, setTimeLast] = useState("");
  const time = useAppSelector(state => state.time.time);
  const getData = async()=>{
    const communityTitleResponse = (await axios.get(serverUrl + "api/community/" + communityId)).data;
    setCommunityTitle(communityTitleResponse.title);
    if(createdAt.slice(0,4) != time.slice(0,4)){
      setTimeLast(String(+time.slice(0,4) - +createdAt.slice(0,4)) + " age.")
      return;
    }
    if(createdAt.slice(5,7) != time.slice(5,7)){
      setTimeLast(String(+time.slice(5,7) - +createdAt.slice(5,7)) + " moth.")
      return;
    }
    if(createdAt.slice(8,10) != time.slice(8,10)){
      setTimeLast(String(+time.slice(8,10) - +createdAt.slice(8,10)) + " day.")
      return;
    }
    if(createdAt.slice(11,13) != time.slice(11,13)){
      setTimeLast(String(+time.slice(11,13) - +createdAt.slice(11,13)) + " hr.")
      return;
    }else{
      setTimeLast(String(+time.slice(14,16) - +createdAt.slice(14,16)) + " min.")
      return;
    }
  }
  useEffect(()=>{
    getData();
  },[])
  return (
    <div className='post_item border-b-[1px] border-gray-700'>
      <div className='post_box px-4 py-1 rounded-xl hover_effect my-1 flex flex-col'>
        <div className='post-top flex justify-between '>
          <div className='flex items-center'>
            <div style={{backgroundImage:`url(${placeholderImage})`, backgroundSize:"cover", backgroundPosition:"center"}} className='h-[21px] mr-[8px] w-[21px] rounded-2xl'></div>
            <p className='text-[13px] text-gray-300 mr-1'>r/{communityTitle}</p>
            <p className='text-[12px] text-gray-400'> • {timeLast} ago</p>
          </div>
          <div className='flex items-center'>
            <div className='hover_effect join_button px-3 font-[700] text-[12px] py-[3px] rounded-2xl bg-blue-700 mr-1'>Join</div>
            <div className='hover_effect post_more rounded-2xl p-1'><img className='w-[20px] hover_effect' src={more} alt="" /></div>
          </div>
        </div>
        <div className='post-middle mb-2'>
          <h1 className='mb-2 mt-2 text-[19px] font-[600]'>
            {title}
          </h1>
          <p className=' text-gray-300'>
            {description}
          </p>
          <div className='h-[460px] flex justify-center mt-2 rounded-xl relative '>
            <div style={{background: `url(${serverUrl + "/PostDataFolder/" + dataLink + "/media/1.png"})`}} className='w-full h-[460px] max-w-[100%] z-[1] max-h-[460px] post_image backdrop-blur-md absolute top-0 rounded-xl'></div>
            <div style={{background: `url(${serverUrl + "/PostDataFolder/" + dataLink + "/media/1.png"})`}} className='w-full h-[460px] post_image_back z-[0] max-h-[100%] max-w-[100%] absolute top-0 rounded-xl' ></div>
          </div>
        </div>
        <div className='post-bottom flex'>
          <div className='rate mr-2 bg-gray-700 rounded-2xl flex items-center'>
            <div className='up_rate_icon_box p-2 rounded-2xl'><UpRate fill='#fff' className="up_rate_icon" /></div>
            <p className='font-[600] text-[12px] post_rate_count'>{karma}</p>
            <div className='down_rate_icon_box p-2 rounded-2xl'><DownRate fill='#fff' className="down_rate_icon"/></div>
          </div>
          <div className='comment mx-2 bg-gray-700 rounded-2xl px-3 py-1 flex items-center'>
            <Comment fill='#fff' className='comment_icon' />
            <p className='font-[600] ml-2 text-[12px]'>4.6K</p>
          </div>
          <div className='share mx-2 bg-gray-700 rounded-2xl px-3 py-1 flex items-center'>
            <Share fill='#fff' className='share_icon' />
            <p className='font-[600] ml-2 text-[12px]'>Share</p>
          </div>
        </div>
      </div>
    </div>
  )
}