# StarNetv2-docker

![Release](https://img.shields.io/github/v/release/tskawada/StarNetv2-docker)
![License](https://img.shields.io/github/license/tskawada/StarNetv2-docker)
![Image Size](https://img.shields.io/docker/image-size/tskawada/starnet/latest)

You can quickly build a GPU-accelerated StarNetv2 environment with docker!

## Usage
### create environment
```bash
docker build -t starnet:latest .
docker run -it --gpus all -v [HOSTDIR]:/StarNetv2CLI_linux/data starnet:latest bash
```

### run StarNet
```bash
./starnet++ data/input.tif data/output.tif [STRIDE]
```

#### STRIDE value and processing time
- NVIDIA GeForce 3090Ti  
- 6000x4000 16bit tiff  

| STRIDE |  tiles | time(sec) |  
| ------ | ------ | --------- |  
|  256   |    384 |      23   |  
|  128   |   1504 |      53   |  
|   64   |   5922 |     168   |  
|   32   |  23500 |     626   |  
|   16   |  93750 |    2442   |  

## Notes
- The author is not the creator of StarNet++.
- The processing time measurements shown in README are only a guide.
