import { 
  Button, 
  Stack, 
  Select, 
  MenuItem, 
  Typography,
  SelectChangeEvent,
  CircularProgress
} from '@mui/material'
import { useState, useRef, Dispatch, SetStateAction } from 'react'
import { uploadFile, starless, download } from './logics'
import useMusic from './useMusic'

type ToolKitProps = {
  rawImage: string | undefined;
  starlessImage: string | undefined;
  setRawImage: Dispatch<SetStateAction<string | undefined>>;
  setStarlessImage: Dispatch<SetStateAction<string | undefined>>;
};

const ToolKit = ({ rawImage, starlessImage, setRawImage, setStarlessImage }: ToolKitProps) => {
  const [stride, setStride] = useState(256);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tiffName, setTiffName] = useState("");
  const [audio] = useMusic();

  const handleStrideChange = (event: SelectChangeEvent<typeof stride>) => {
    setStride(event.target.value as number);
  };

  const handleRunClick = async () => {
    if (!rawImage) {
      alert("Please upload an image first.")
      return;
    }
    if (!isLoading) {
      setIsLoading(true)
      setStarlessImage(await starless(stride))
      setIsLoading(false)
      audio?.play()
    } else {
      alert("Please wait for the current process to finish.")
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setTiffName(file.name)
      file.name.split(".").pop() === "tif" ? setRawImage(await uploadFile(file)) : alert("Please upload a TIFF file.");
    }
  };

  const outputName = () => {
    return "starless_" + stride + "_" + tiffName
  };

  const handleDownloadClick = async () => {
    const link = document.createElement("a");
    link.download = outputName();
    const referenceUrl: string | undefined = await download();
    referenceUrl ? link.href = referenceUrl : link.href = "nocontent";
    link.click();
  };

  return (
    <>
      <Typography sx={{ ml: 1 }}>{rawImage ? tiffName : ""}</Typography>
      <Stack alignItems="flex-end" sx={{ mr: 2 }}>
        <Stack 
          spacing={2} 
          direction="row" 
          sx={{ m: 1 }} 
          alignItems="center"
          >
          { isLoading ? <CircularProgress /> : <></> }
          <Typography>STRIDE</Typography>
          <Select sx={{ minWidth: 100 }} value={stride} onChange={handleStrideChange}>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={32}>32</MenuItem>
            <MenuItem value={64}>64</MenuItem>
            <MenuItem value={128}>128</MenuItem>
            <MenuItem value={256}>256</MenuItem>
          </Select>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button 
              sx={{ border: 1 }} 
              onClick={handleUploadClick} 
              disabled={isLoading}
              variant="contained"
            >
              UPLOAD
            </Button>
          </div>
          <Button 
            sx={{ border: 1 }} 
            onClick={handleRunClick} 
            variant="contained"
            disabled={!rawImage}
          >
            RUN
          </Button>
          <Button 
            sx={{ border: 1 }} 
            disabled={isLoading || !starlessImage}
            onClick={handleDownloadClick}
            variant="contained"
          >
            DOWNLOAD
          </Button>
        </Stack>
      </Stack>
    </>
    );
};

export default ToolKit;
