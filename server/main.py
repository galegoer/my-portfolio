from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

from number_detector import analyze_number

class UriData(BaseModel):
    uri: str

app = FastAPI()


@app.get("/send")
def read_root():
    return {"Hello": "World"}

@app.post("/guess-number")
def guess_number(uri: UriData):
    num = analyze_number(uri.uri)
    print("gueeaeseed num: ", num)
    return {"guessed_number": str(num)}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}