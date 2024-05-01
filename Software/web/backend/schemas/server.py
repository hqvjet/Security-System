from pydantic import BaseModel

class ServerBase(BaseModel):
    # Define server schemas here
    pass

class ServerCreate(ServerBase):
    pass

    class Config:
        orm_mode = True
