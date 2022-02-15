import React from "react";
import { observer } from "mobx-react-lite";

function PetList({ store }) {
    const handleAddPet=(e) =>{
        const name = prompt("Name of the pet");
        const type = prompt("Type of the pet");
        const breed = prompt("Breed of the pet");
        const ownerId = prompt("Owner's Id of the pet");

        const pet = store.createPet({ id: Date.now(), name, breed, type });
        store.assignOwnerToPet(ownerId, pet.id);
    }
    return (
        <div>
            {store.storeDetails}
            <br/>
            <button onClick={handleAddPet}>Add new Pet</button>
        
        </div>
  );
}

export default observer(PetList);