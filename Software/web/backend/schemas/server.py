from pydantic import BaseModel

class ServerBase(BaseModel):
    pass

class ServerCreate(ServerBase):
    pass

    class Config:
        from_attributes = True
