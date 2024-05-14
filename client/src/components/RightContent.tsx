import React, { useEffect, useState } from 'react'
import { placeholderImage, serverUrl } from '../consts/consts';
import './styles/rightContent.css';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../types/reduxTypes';
import { setPosts } from '../reducers/postsReducer';
import PostBlock from './PostBlock';
import { setCommunityes } from '../reducers/communityesReducer';
import { Post } from '../types/types';

export default function RightContent() {
  const [loading,setLoading] = useState(true);
  const hideMenu = useAppSelector(state => state.toggleBools.hideMenu);
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts.posts)
  const community = useAppSelector(state => state.communityes.communityes)

  const getData = async()=>{
    const communityData = (await axios.get(serverUrl + "api/community")).data;
    const postsData:any[] = (await axios.get(serverUrl + "api/post/1")).data;
    for(let i = 0; i < postsData.length; i++){
      const title = (await axios.get(serverUrl +`PostDataFolder/${postsData[i].dataLink}/tittle.txt`)).data;
      const desc = (await axios.get(serverUrl +`PostDataFolder/${postsData[i].dataLink}/description.txt`)).data;
      postsData[i].title = title;
      postsData[i].description = desc;
    }
    dispatch(setCommunityes(communityData.rows));
    dispatch(setPosts(postsData));
    setLoading(false);
  }
  useEffect(()=>{
    getData();
  },[])
  return (
    <div className='text-white flex justify-between w-full'>
      {!hideMenu && <div className='solid w-[270px]'></div>}
      {loading ? 
      <p className=' text-center w-full mt-4 ' >Loading...</p>
      :
      <div className='pt-4 flex-1 flex flex-col items-center'>
        <div className='ml-3 flex flex-col box_with_contents'>
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
            <div className='posts_content max-w-[900px] flex-1 pr-6'>
              <div className='sorting flex pb-2 border-b-[1px] border-gray-700'>
                <select defaultValue="Hot" className='select_sort text-gray-400 rounded-2xl px-2 bg-gray-900 py-1' name="sortBy" id="sortBy">
                  <option value="Hot">Hot</option>
                  <option value="Best">Best</option>
                  <option value="New">New</option>
                  <option value="Top">Top</option>
                </select>
              </div>
              <div className='posts_list'>
                {posts.map((el:Post)=><PostBlock createdAt={el.createdAt} communityId={el.communityId} karma={el.karma} dataLink={el.dataLink} key={el.id} title={el.title} description={el.description} />)}
              </div>
            </div>
            <div className='popular_communityes h-fit sticky top-[70px] bg-gray-950 w-[304px] p-[1rem] rounded-[10px] flex flex-col'>
              <p className='text-gray-400 text-[14px] mb-4'>POPULAR COMMUNITIES</p>
              <div className='popular_communityes_list ml-1'>
                {community.map(el=>
                <div key={el.id} className='popular_community_item flex items-center py-2 px-6 hover_effect'>
                  <div style={{backgroundImage:`url(${placeholderImage})`, backgroundSize:"cover", backgroundPosition:"center"}} className='h-[32px] mr-[8px] w-[32px] rounded-2xl'></div>
                  <div className='popular_community_item_content flex-1'>
                    <h1 className='text-gray-100' >r/{el.title}</h1>
                    <p className='text-[11px] text-gray-500'>4,542,199 members</p>
                  </div>
                </div>
                )}
              </div>
              <div className='hover_effect px-3 py-[6px] see_more_button text-[14px] w-fit rounded-2xl'>See more</div>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  )
}
