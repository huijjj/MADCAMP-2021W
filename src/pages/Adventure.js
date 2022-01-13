import { useEffect, useState } from "react"

export default function Adventure() {
  const [ animalList, setAnimalList ] = useState([]);
  useEffect(() => {
    setAnimalList([
      {
        id: 1000000000,
        type: "김기영1",
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
        type: "김기영2",
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
        type: "김기영3",
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
        type: "김기영2",
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
  
  const test = [1,2,3];

  return (
    <div>
      { animalList.map(
        (animal) => (<p>{animal.type}</p>)
        )
      }
    </div>  
  );
}