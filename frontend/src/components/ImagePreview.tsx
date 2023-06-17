import { Box, Stack, Typography } from '@mui/material'
import { AspectRatio } from '@mui/joy';

type ImagePreviewProps = {
  rawImage: string | undefined;
  starlessImage: string | undefined;
};

  const ImagePreview = ({
    rawImage,
    starlessImage,
  }: ImagePreviewProps) => {

    interface ImageBoxProps {
      src: string | undefined;
    }

    const ImageBox = (props: ImageBoxProps) => {
      return (
        <Box 
          component="img"
          sx={{
            width: 1/2, 
            borderRadius: 1
          }}
          src={ props.src ? props.src : undefined }
        />
      );
    };

    const NoContent = () => {
      return (
        <AspectRatio ratio="4/3" sx={{ width: 1/2, borderRadius: 1 }}>
          <Typography variant="h2" component="div">
            No Content
          </Typography>
        </AspectRatio>
      );
    };

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