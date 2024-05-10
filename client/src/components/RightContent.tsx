import React from 'react'
import { placeholderImage } from '../consts/consts';
import './styles/rightContent.css';
import more from '../assets/more.svg';
import UpRate from '../assets/upRate.svg?react';
import DownRate from '../assets/downRate.svg?react';
import Comment from '../assets/comment.svg?react';
import Share from '../assets/share.svg?react';

export default function RightContent() {
  return (
    <div className='text-white flex justify-between w-full'>
      <div className='solid w-[270px]'></div>
      <div className='pt-4 flex-1 flex flex-col items-center'>
        <div className='w-[1100px] flex flex-col box_with_contents'>
          <div className='top_content flex flex-nowrap overflow-hidden'>
            <div style={{background: `url(${placeholderImage})`, backgroundSize:"cover", backgroundPosition:"center"}} className='top_content_item mr-6 hover_effect rounded-xl flex flex-col justify-end w-[280px] h-[210px] p-[1rem] '>
              <h1 className=' font-[900] text-[21px] ' >Super News!</h1>
              <p className='text-ellipsis overflow-hidden text-nowrap  '>Very interesting description Very Very interesting description</p>
              <div className='flex items-center mt-[8px]'>
                <div style={{backgroundImage:`url(${placeholderImage})`, backgroundSize:"cover", backgroundPosition:"center"}} className='h-[21px] mr-[8px] w-[21px] rounded-2xl'></div>
                <p className='text-[11px] text-gray-400'><span className='text-[#ffffff] font-[600] '>r/community</span> and more</p>
              </div>
            </div>
          </div>
          <div className='bottom_content min-h-[150vh] mt-4 flex'>
            <div className='posts_content flex-1 pr-6'>
              <div className='sorting flex pb-2 border-b-[1px] border-gray-700'>
                <select className='select_sort text-gray-400 rounded-2xl px-2 bg-gray-900 py-1' name="sortBy" id="sortBy">
                  <option value="Hot" selected>Hot</option>
                  <option value="Best">Best</option>
                  <option value="New">New</option>
                  <option value="Top">Top</option>
                </select>
              </div>
              <div className='posts_list'>
                <div className='post_item border-b-[1px] border-gray-700'>
                  <div className='post_box px-4 py-1 rounded-xl hover_effect my-1 flex flex-col'>
                    <div className='post-top flex justify-between '>
                      <div className='flex items-center'>
                        <div style={{backgroundImage:`url(${placeholderImage})`, backgroundSize:"cover", backgroundPosition:"center"}} className='h-[21px] mr-[8px] w-[21px] rounded-2xl'></div>
                        <p className='text-[13px] text-gray-300 mr-1'>r/community</p>
                        <p className='text-[12px] text-gray-400'> • 9 hr. ago</p>
                      </div>
                      <div className='flex items-center'>
                        <div className='hover_effect join_button px-3 font-[700] text-[12px] py-[3px] rounded-2xl bg-blue-700 mr-1'>Join</div>
                        <div className='hover_effect post_more rounded-2xl p-1'><img className='w-[20px] hover_effect' src={more} alt="" /></div>
                      </div>
                    </div>
                    <div className='post-middle mb-2'>
                      <h1 className='mb-2 mt-2 text-[19px] font-[600]'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint officiis, fugiat!
                      </h1>
                      <p className=' text-gray-300'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque labore debitis magni velit beatae sit numquam natus dignissimos cupiditate. Nemo, reiciendis? Reiciendis aliquam ullam, id quisquam a dicta omnis asperiores.
                      </p>
                    </div>
                    <div className='post-bottom flex'>
                      <div className='rate mr-2 bg-gray-700 rounded-2xl flex items-center'>
                        <div className='up_rate_icon_box p-2 rounded-2xl'><UpRate fill='#fff' className="up_rate_icon" /></div>
                        <p className='font-[600] text-[12px] post_rate_count'>15.6K</p>
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
              </div>
            </div>
            <div className='popular_communityes h-fit sticky top-[70px] bg-gray-950 w-[304px] p-[1rem] rounded-[10px] flex flex-col'>
              <p className='text-gray-400 text-[14px] mb-4'>POPULAR COMMUNITYES</p>
              <div className='popular_communityes_list ml-1'>
                <div className='popular_community_item flex items-center py-2 px-6 hover_effect'>
                  <div style={{backgroundImage:`url(${placeholderImage})`, backgroundSize:"cover", backgroundPosition:"center"}} className='h-[32px] mr-[8px] w-[32px] rounded-2xl'></div>
                  <div className='popular_community_item_content flex-1'>
                    <h1 className='text-gray-100' >r/CommunityWow</h1>
                    <p className='text-[11px] text-gray-500'>4,542,199 members</p>
                  </div>
                </div>
              </div>
              <div className='hover_effect px-3 py-[6px] see_more_button text-[14px] w-fit rounded-2xl'>See more</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
