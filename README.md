# StarNetv2-WebUI

![Release](https://img.shields.io/github/v/release/tskawada/StarNetv2-WebUI)
![License](https://img.shields.io/badge/lisence-MIT-blue)
![Image Size](https://img.shields.io/docker/image-size/tskawada/starnet/latest)

You can quickly build a GPU-accelerated StarNetv2 environment and its Web UI!

## Usage
1. create environment
    ```bash
    git clone https://github.com/tskawada/StarNetv2-WebUI.git
    cd StaNetv2-WebUI
    docker-compose up -d
    ```

2. access the web ui  
    http://localhost:3000


## STRIDE value and processing time
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
- The author is not the creator of StarNetv2.
- The processing time measurements shown in README are only a guide.
