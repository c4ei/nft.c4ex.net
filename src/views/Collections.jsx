import { useEffect } from 'react'
import Empty from '../components/Empty'
import { useGlobalState } from '../store'
import Artworks from '../components/Artworks'
import { loadCollections } from '../services/blockchain'

const Collections = () => {
  let _error = false;
  const [collections] = useGlobalState('collections');
  useEffect(async () => { 
    try{
      await loadCollections() 
    }
    catch(e){
      alert('메타마스크 연동 후 확인 가능 합니다.');
      _error = true;
    }
  })

  return (
    <div>
      {
        !_error&&
      collections.length > 0 ? (
        <Artworks title="Your Collections" auctions={collections} showOffer />
      ) : (
        <Empty />
      )
      }
    </div>
  )
}

export default Collections
