import { Stack } from '@mui/material'
import Header from './components/Header'
import ImagePreview from './components/ImagePreview'
import ToolKit from './components/ToolKit'
import { useState } from 'react'

function App() {
  const [rawImage, setRawImage] = useState<string | undefined>("");
  const [starlessImage, setStarlessImage] = useState<string | undefined>("");

  return (
    <>
      <Header />
      <Stack>
        <ImagePreview 
          rawImage={rawImage}
          starlessImage={starlessImage}
        />
        <ToolKit 
          rawImage={rawImage} 
          starlessImage={starlessImage} 
          setRawImage={setRawImage}
          setStarlessImage={setStarlessImage}
        />
      </Stack>
    </>
  );
}

export default App;
