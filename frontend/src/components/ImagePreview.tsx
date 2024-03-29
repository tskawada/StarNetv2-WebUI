import { Modal, Box, Stack, Typography } from '@mui/material';
import { AspectRatio } from '@mui/joy';
import React, { useState } from 'react';


interface ImageBoxProps {
  src: string | undefined;
}

const ImageBox = (props: ImageBoxProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(prev => !prev);
  const handleClose = () => setOpen(true);

  return (
    <Box 
      sx={{
        width: 1/2, 
        borderRadius: 1
      }}
      onClick={handleOpen}
    >
      <img src={ props.src ? props.src : undefined } style={{ width: '100%' }} alt="proc-img"/>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            justifyContent: 'center',
            height: '90%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            borderRadius: 1,
          }}
        >
          <img src={ props.src ? props.src : undefined } style={{ height: '100%' }} alt="proc-img"/>
        </Box>
      </Modal>
    </Box>
  );
};

const NoContent = () => {
  return (
    <AspectRatio ratio="8/5" sx={{ width: 1/2, borderRadius: 1 }}>
      <Typography variant="h2" component="div">
        No Content
      </Typography>
    </AspectRatio>
  );
};

type ImagePreviewProps = {
  rawImage: string | undefined;
  starlessImage: string | undefined;
};

const ImagePreview = ({
  rawImage,
  starlessImage,
}: ImagePreviewProps) => {

  return (
    <Stack 
      direction="row" 
      spacing={0.5}
      sx={{ m: 1 }}
      alignItems="center" 
      justifyContent="space-evenly"
    >
      { rawImage ? <ImageBox src={rawImage} /> : <NoContent /> }
      { starlessImage ? <ImageBox src={starlessImage} /> : <NoContent /> }
    </Stack>
  );
};

export default ImagePreview