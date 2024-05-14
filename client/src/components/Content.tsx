import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'
import { useAppDispatch, useAppSelector } from '../types/reduxTypes'
import { setHideMenu } from '../reducers/toggleReducer';

export default function Content() {
  const dispatch = useAppDispatch();
  const hideMenu = useAppSelector(state => state.toggleBools.hideMenu);
  const openMenu = useAppSelector(state => state.toggleBools.openMenu);
  window.addEventListener('resize',()=>{
    if(window.innerWidth < 1200){
      dispatch(setHideMenu(true));
    }
    else{
      dispatch(setHideMenu(false));
    }
  })
  return (
    <div className='flex justify-end'>
        {(!hideMenu || (hideMenu && openMenu))  && <LeftContent/>}
        <RightContent/>
    </div>
  )
}
