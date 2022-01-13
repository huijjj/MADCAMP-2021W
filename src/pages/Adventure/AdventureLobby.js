import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from "@mui/material";

export default function AdventureLobby() {
  const navigate = useNavigate();
  const [ animalList, setAnimalList ] = useState([]);
  useEffect(() => {
    setAnimalList([
      {
        id: 1000000000,
        name: "기돌이",
        type: "김기영1",
        sex: "F",
        owner: 2000000000,
        adventureCount: 0,
        itemCount: 0,
        geee: 0,
        duck: 0,
        chae: 0,
        isCarbonCompound: false
      },
      {
        id: 1000000001,
        name: "기순이",
        type: "김기영2",
        sex: "M",
        owner: 2000000000,
        adventureCount: 3,
        itemCount: 10,
        geee: 40,
        duck: 20,
        chae: 70,
        isCarbonCompound: false
      },
      {
        id: 1000000002,
        name: "기똥이",
        type: "김기영3",
        sex: "F",
        owner: 2000000000,
        adventureCount: 5,
        itemCount: 20,
        geee: 20,
        duck: 80,
        chae: 120,
        isCarbonCompound: false
      },
      {
        id: 1000000003,
        name: "기뚱이",
        type: "김기영2",
        sex: "M",
        owner: 2000000000,
        adventureCount: 2,
        itemCount: 14,
        geee: 50,
        duck: 30,
        chae: 50,
        isCarbonCompound: false
      }
    ]);
  }, []);

  const onClick = (target) => {
    navigate(`/adventure/${target}`);
  };

  return (
    <div>
      { animalList.map(
          (animal) => 
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia 
                component="img"
                image={`/images/${animal.type.substr(0, 3)}/${animal.type.substr(3,1)}.jpg`}
                alt={`${animal.type}.jpg`}
              />
              <CardContent> 
                <Typography gutterBottom variant="h5" component="div">
                  {animal.name}, {animal.sex}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  지: {animal.geee}<br/>
                  덕: {animal.duck}<br/>
                  체: {animal.chae}<br/>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={(e) => 
                    {e.preventDefault();
                     onClick("floor/1")}
                  }
                >
                참가하기
                </Button>
              </CardActions>
            </Card>
        )
      }
      
    </div>  
  );
}