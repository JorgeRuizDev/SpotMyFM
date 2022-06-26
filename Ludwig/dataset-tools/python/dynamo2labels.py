import json
import os
from modules.readDataset import read_dataset

def main():

    tracks_dict = {}
    data_path = "./dataset/data"
    for json_ in os.listdir(data_path):
        with open (f"{data_path}/{json_}") as f:
            tracks = json.load(f)
            for t in tracks["Items"]:
                tracks_dict[t["PK"]["S"]] = t

    #print(list(tracks.values())[0])
    with open("labels.json", "w") as f:
        json.dump({"tracks": tracks_dict}, f)

    print("Labels dumped")


    with open("labels.json", "r") as f:
        json.load(f)
    print("Labels OK")

if __name__ == "__main__":
    main()