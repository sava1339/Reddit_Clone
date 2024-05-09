import search from './assets/search.svg';
import cancel from './assets/cancel.svg';
import qrcode from './assets/qrcode.svg';
import more from './assets/more.svg';
import redditLogo from './assets/reddit.svg';
import redditTitle from './assets/redditTitle.svg';
import trand from './assets/trand.svg';
import { useState } from 'react';

function App() {
  //consts
  const placeholderImage = "placeholder.png";
  const [searchText,setSearchText] = useState("");
  const [searchInputFocus,setSearchInputFocus] = useState(false);

  //functions
  const searchChangeEvent = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchText(e.target.value)
  }
  const searchClear = ()=>{
    setSearchText("");
  }
  const handleSearchInputFocus = ()=>{
    setSearchInputFocus(true);
  }
  const checkClickObject = (e:any) =>{
    if(e.target.id == "all_page"){
      setSearchInputFocus(false);
      return;
    }
    if(e.target.id == "search_box"){
      return;
    }
    let el = e.target;
    while(true){
      const nowElement = el.parentNode;
      if(!el.parentNode){
        break;
      }
      if(nowElement.id == "all_page"){
        setSearchInputFocus(false);
        break;
      }
      if(nowElement.id == "search_box"){
        break;
      }
      el = nowElement.parentNode;
    }
  }

  return (
    <>
      <div id='all_page' onClick={checkClickObject} className="bg-gray-900 h-[100vh] ">
        <header className=' flex justify-between items-center w-[calc(100%-16px)] mx-[8px] py-[8px] px-[8px] border-gray-600 border-b-[1px] ' >
          <div className='flex items-center '>
            <img className='w-[30px] mr-[6px] ' src={redditLogo} alt="" />
            <img className='h-[22px]' src={redditTitle} alt="" />
          </div>
          <div id='search_box' className='search_box relative'>
            <div className="bg-gray-800 flex relative items-center px-[12px] py-[8px] rounded-3xl w-[500px] main_search ">
              <img className=' search_icon w-[20px] ' src={search} alt="" />
              <input onFocus={handleSearchInputFocus} placeholder='Search Reddit' value={searchText} onChange={searchChangeEvent} className="search_input flex-1 text-[13px] px-[6px] bg-gray-800 w-full text-[#fff] border-0 " type="text" />
              {searchText != "" && <img onClick={searchClear} className=' cancel_icon w-[17px] hover_effect ' src={cancel} alt="" />}
            </div>
            <div style={{display: searchInputFocus ? "block" : "none"}} className=' bottom_search absolute border-gray-600 border-b-[1px] h-[30px] w-[500px] bg-gray-800 px-[12px] right-0 top-[16px]'>
              <div className='absolute search_content bg-gray-800 left-0 top-[30px] w-[500px]'>
                <div className='px-[16px] py-[12px]'>
                  <div className='flex flex-col'>
                    <div className='flex mb-[16px]'>
                      <img className=' w-[20px] mr-[8px]' src={trand} alt="" />
                      <p className='text-gray-400 text-[14px]'>TRAND TODAY</p>
                    </div>
                    <div className='flex hover_effect justify-between search_content_element'>
                      <div className='flex flex-col'>
                        <p className='text-[13px] font-[600] text-gray-100'>Заголовок новости</p>
                        <p className='text-[12px]  text-gray-200'>Описание новости</p>
                        <div className='flex items-center mt-[8px]'>
                          <div style={{backgroundImage:`url(${placeholderImage})`, backgroundSize:"cover", backgroundPosition:"center"}} className='h-[15px] mr-[4px] w-[15px] rounded-2xl bg-slate-400'></div>
                          <p className='text-[11px] text-gray-400'>r/community</p>
                        </div>
                      </div>
                      <div style={{backgroundImage:`url(${placeholderImage})`, backgroundSize:"cover", backgroundPosition:"center"}} className='h-[60px] w-[90px] rounded bg-slate-400'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex'>
            <div className='mr-[8px] qrcode_button hover_effect flex rounded-3xl px-[12px] py-[8px] bg-gray-800 '>
              <img className=' h-[22px]  mr-[8px]' src={qrcode} alt="" />
              <p className=' text-[13px] font-[600] text-[#fff] '>Get app</p>
            </div>
            <div className='mr-[16px] login_button hover_effect bg-red-600 rounded-3xl px-[12px] py-[8px]'>
              <p className='text-[13px] font-[600] text-[#fff] '>Log in</p>
            </div>
            <img className=' w-[18px] hover_effect ' src={more} alt="" />
          </div>
        </header>
      </div>
    </>
  )
}

export default App
