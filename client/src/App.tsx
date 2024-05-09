import { useEffect } from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import { setSearchInputFocus } from "./reducers/toggleReducer";
import { useAppDispatch } from "./types/reduxTypes";

function App() {
  const dispath = useAppDispatch();

  const checkClickObject = (e:any) =>{
    if(e.target.id == "all_page"){
      dispath(setSearchInputFocus(false));
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
      if(nowElement.id == "all_page" || nowElement.id == "root"){
        dispath(setSearchInputFocus(false));
        break;
      }
      if(nowElement.id == "search_box" || nowElement.classList.contains("main_search") || nowElement.classList.contains("bottom_search")){
        break;
      }
      el = nowElement.parentNode;
    }
  }
  return (
    <>
      <div id='all_page' onClick={checkClickObject} className="bg-gray-900 min-h-[100vh] ">
        <Header/>
        <Content/>
      </div>
    </>
  )
}

export default App
