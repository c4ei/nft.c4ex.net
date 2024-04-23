import { useEffect } from 'react'
import Empty from '../components/Empty'
import { useGlobalState } from '../store'
import Artworks from '../components/Artworks'
import { loadCollections } from '../services/blockchain'

const Collections = () => {
  const [collections] = useGlobalState('collections');
  useEffect(() => { loadCollections(); })
  // console.log(collections.length +" : collections.length - /src/views/Collections.jsx ")
  return (
    <div>
      {
      collections.length > 0 ? 
      (
        <Artworks title="Your Collections" auctions={collections} showOffer />
      ) : ( <Empty /> )
      }
    </div>
  )
}

export default Collections
