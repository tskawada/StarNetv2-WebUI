FROM nvidia/cuda:11.8.0-cudnn8-runtime-ubuntu22.04
SHELL ["/bin/bash", "-c"]

RUN apt-get -y update && \
    apt-get -y upgrade && \
    apt-get -y install wget unzip libtiff5 python3 python3-dev python3-pip

RUN pip3 install -U pip && \
    pip3 install fastapi "uvicorn[standard]" pillow python-multipart

RUN wget https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-gpu-linux-x86_64-2.6.0.tar.gz
RUN tar -C /usr/local -xzf libtensorflow-gpu-linux-x86_64-2.6.0.tar.gz && \
    ldconfig /usr/local/lib

ENV TF_FORCE_GPU_ALLOW_GROWTH="true"

RUN wget https://starnetastro.com/wp-content/uploads/2022/03/StarNetv2CLI_linux.zip
RUN unzip StarNetv2CLI_linux.zip && \
    cd StarNetv2CLI_linux && \
    chmod 755 ./starnet++ && \
    mkdir temp data input output && \
    mv libtensorflow* ./temp/ && \
    mv libtiff.so.3 /usr/lib/

RUN rm /StarNetv2CLI_linux.zip /libtensorflow-gpu-linux-x86_64-2.6.0.tar.gz

COPY main.py /StarNetv2CLI_linux
COPY starnet++.sh /StarNetv2CLI_linux
RUN chmod 755 /StarNetv2CLI_linux/starnet++.sh

WORKDIR /StarNetv2CLI_linux

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8080"]
