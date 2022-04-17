from typing import Optional

from pydantic import BaseModel


class LudwigTrackBase(BaseModel):

    moods: Optional[bool] = True
    genres: Optional[bool] = True
    subgenres: Optional[bool] = True


class LudwigTrackUrl(LudwigTrackBase):
    url: str
