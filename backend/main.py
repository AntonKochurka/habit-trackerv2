from fastapi import FastAPI

def makeapp():
    app = FastAPI()

    return app

app = makeapp()