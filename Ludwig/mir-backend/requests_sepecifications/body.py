from typing import List, Optional

from pydantic import BaseModel


class LudwigTrackBase(BaseModel):

    moods: Optional[bool] = True
    genres: Optional[bool] = True
    subgenres: Optional[bool] = True


class LudwigTrackUrl(LudwigTrackBase):
    url: str


class UrlBulk(BaseModel):
    id: str
    url: str

class LudwigTrackUrlBulk(LudwigTrackBase):
    tracks: List[UrlBulk]
