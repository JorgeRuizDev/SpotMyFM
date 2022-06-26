import json
import os
from pprint import pprint
from typing import Any, List

def read_dataset(path: str, maxPerSubgenre = None):

    items = []
    subgenres = {}
    tracks = {}

    for file in os.listdir(path):
        f_name = f"{path}/{file}"

        with open(f_name) as f:
            dump = json.load(f)
            for it in dump["Items"]:
                items.append(it)
                tracks[it["PK"]["S"]] = it
                
                for sub in it["subgenres"]["L"]:
                    sub_count = subgenres.get(sub["S"], 0)
                    subgenres[sub["S"]] = sub_count + 1

    print("Subgenres Distribution")
    pprint(subgenres)
    print(f"Total Tracks: {sum(list(subgenres.values()) )}")
    return cluster_genres(items), tracks



def cluster_genres(tracks: List[Any], items_per_subgenre = 300):
    tracks.sort(key=lambda t: t["popularity"]["N"], reverse=True)

    subgenres = {}

    for track in tracks:
        track_sub = [s["S"] for s in track["subgenres"]["L"]]


        counts = [len(subgenres.get(s, [])) for s in track_sub]
        

        if sum(counts) >  len(counts) * items_per_subgenre:
            continue 
            
        for sub in track_sub:
            tracks_ = subgenres.get(sub, [])
            tracks_.append(track["PK"]["S"])
            subgenres[sub] = list(set(tracks_))

    return subgenres
