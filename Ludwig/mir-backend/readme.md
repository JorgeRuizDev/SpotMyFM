# Ludwig Backend Music Information Retrieval API

## This API is built with FastAPI and ONNX

### How To Install

```bash
$ pip install -r requirements.txt
```

### How To Run

```bash
$ uvicorn main:app
```


### Tag image & Push To Google Cloud Container Registry:

```
$ docker build -t ludwig-mir .
$ docker tag ludwig-mir gcr.io/ludwig-mir-backend/ludwig-mir
$ docker push gcr.io/ludwig-mir-backend/ludwig-mir
```