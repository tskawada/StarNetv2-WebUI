from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from starlette.middleware.cors import CORSMiddleware
from PIL import Image
from datetime import datetime
import os
import subprocess as sp
import shutil


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_save_name():
    global save_name
    save_path = "input"
    save_name = os.path.join(
        save_path, datetime.now().strftime("%Y-%m-%d_%H-%M-%S") + ".tif"
    )


def get_starless_name():
    global save_name
    global starless_name
    starless_name = save_name.replace("input", "output")


global save_name
global starless_name
get_save_name()
get_starless_name()


@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    global save_name
    get_save_name()

    fileobj = file.file
    with open(save_name, "wb") as f:
        shutil.copyfileobj(fileobj, f)

    im = Image.open(save_name)
    im.convert("RGB")
    jpg_name = save_name.replace(".tif", ".jpg")
    im.save(jpg_name, format="jpeg", quarity="100")

    return FileResponse(jpg_name, media_type="/image/jpeg")


@app.get("/starless")
async def starless(stride: int = 256):
    global save_name
    global starless_name
    get_starless_name()

    sp.run(["./starnet++.sh", save_name, starless_name, str(stride)])

    im = Image.open(starless_name)
    im.convert("RGB")
    jpg_name = starless_name.replace(".tif", ".jpg")
    im.save(jpg_name, format="jpeg", quarity="100")

    return FileResponse(jpg_name, media_type="/image/jpeg")


@app.get("/download")
async def download():
    return FileResponse(starless_name, media_type="/image/tiff")
