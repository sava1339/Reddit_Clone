import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

export default function Content() {
  return (
    <div className='flex justify-end'>
        <LeftContent/>
        <RightContent/>
    </div>
  )
}
