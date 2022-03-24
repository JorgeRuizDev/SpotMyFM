import argparse
import asyncio
import json
import os
from pprint import pprint
import requests
from modules.readDataset import read_dataset
import pandas as pd
import traceback
def parse_args():
    parser = argparse.ArgumentParser(
        description="Dataset Tools to download the Ludwig Dataset from a given DynamodDB Dump"
    )
    parser.add_argument(
        "-d", dest="dataset", help="Datset Path",
    )
    parser.add_argument(
        "-o", dest="output", help="Datset Path",
    )
    return parser.parse_args()


def make_dir(path: str):
    if not os.path.exists(path):
        os.makedirs(path)






def main():
    def download_worker(tracks: list, id: int):
        while len(tracks):
            print(len(tracks))
            item = tracks.pop()

            try:
                genre = item["genre"]["S"].replace("/","_") or "other"
                id = item["PK"]["S"]
                pop = item["popularity"]["N"]
                name = item.get("name", {"S": id}) 
                preview = item["preview"]["S"]

                path = f"{out}/{genre}"
                make_dir(path)
                r = requests.get(preview, allow_redirects=True)

                with open(f"{path}/{id}.mp3", "wb") as out_file:
                    print(f"{id}) {name['S']}")
                    out_file.write(r.content)

            except Exception:
                
                traceback.print_exc()
                print(item)



    args = parse_args()
    subgenres = args.dataset or "dataset/data"
    out = "out/mp3"

    subgenres, tracks = read_dataset(subgenres)

    
    
    with open("subgeneres.json", "w") as f:
        json.dump(subgenres, f)

    #for k, v in subgenres:
    #    print(f"{k}: {len(v)}")
    print(f"Total Tracks {sum([len(x) for x in subgenres.values()])}")

    
    tracks_download = {}

    for sub in subgenres.values():
        for t in sub:
            tracks_download[t] = tracks[t]


    download_worker(list(tracks_download.values()), 0)




if __name__ == "__main__":
    main()
