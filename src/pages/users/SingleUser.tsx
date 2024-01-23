import React from 'react'
import Single from '../../components/single/Single'
import { singleUser } from '../../data'
import { slugs } from '../../constant'

const SingleUser = () => {
  return (
    <div>
      <Single data ={singleUser} slug={slugs.USER}/>
    </div>
  )
}

export default SingleUser
