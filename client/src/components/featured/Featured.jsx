import React from 'react'
import "./featured.css"
import useFetch from '../../hooks/useFetch'

export const Featured = () => {

const {data,loading,error,reFetch}= useFetch("/hotels/countByCity?cities=goa,mumbai,pune")
  
  return (
    <div className='featured'>
      {loading ? "loading please wait": <><div className="featuredItem">
        <img src="https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='featuredImg'/>
        <div className="featuredTitles">
          <h1>Mumbai</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="https://images.unsplash.com/photo-1600256698796-ecef3f5b1b57?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='featuredImg' />
        <div className="featuredTitles">
          <h1>Norawy</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="https://images.unsplash.com/photo-1598751337485-0d57b0c50b83?q=80&w=1882&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='featuredImg'/>
        <div className="featuredTitles">
          <h1>Italy</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div></>}
    </div>
  )
}
