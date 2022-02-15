import {
    action,
    computed,
    makeObservable,
    observable,
    autorun,
    runInAction,
  } from "mobx";

export class PetOwnerStore {
    pets= [];
    owners= [];

    constructor () {
        makeObservable(this, {
          pets: observable,
          owners: observable,
          totalOwners: computed,
          totalPets: computed,
          storeDetails: computed,
          getPetsByOwner: action,
          createPet: action,
          createOwner: action,
          updatePet: action,
          updateOwner: action,
          deletePet: action,
          deleteOwner: action,
          assignOwnerToPet: action
        });
        autorun(this.logStoreDetails);
      }
    // create a pet
    createPet(pet = { id: 0, name: "", type: "", breed: "", owner: null }) {
        this.pets.push(pet);
        return pet;
    }

    // create an owner
    createOwner(owner = { id: 0, firstName: "", lastName: "" }) {
        this.owners.push(owner);
        return owner;
    }

    // update the owner
    updateOwner(ownerId, updatedOwner) {
        const result= this.owners.map(owner =>{
            if(owner.id===ownerId){
                return updatedOwner;
            }else{
                return owner;
            }
        })
        this.owners= result;
    }

    // update the pet
    updatePet(petId, updatedPet) {
        const petAtIndex= this.pets.findIndex(pet => pet.id===petId);
        if(petAtIndex > -1 && updatedPet){
            this.pets[petAtIndex] = updatedPet;
        }
    }
    // delete pet by id
    deletePet(petId){
        const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
        if (petIndexAtId > -1) {
            this.pets.splice(petIndexAtId, 1)
        }
    }
    // delete owner by id
    deleteOwner(ownerId) {
        const ownerIndexAtId = this.owners.findIndex((owner) => owner.id === ownerId);
        if (ownerIndexAtId > -1) {
          this.owners.splice(ownerIndexAtId, 1)
        }
    }
    // total number owners
    get totalOwners() {
        return this.owners.length;
    }
    // total number pets
    get totalPets() {
        return this.pets.length;
    }
    // Get pets using ownerId
    getPetsByOwner(ownerId) {
        return this.pets.filter((pet) => {
            return pet.owner && pet.owner.id === ownerId;
        });
    }
    // assign an owner using ownerId to a pet using petId
    assignOwnerToPet(ownerId, petId) {
        const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
        const ownerIndexAtId = this.owners.findIndex((pet) => pet.id === ownerId);
        if (petIndexAtId > -1 && ownerIndexAtId > -1) {
        this.pets[petIndexAtId].owner = this.owners[petIndexAtId];
        }
    }
    // get store details
    get storeDetails () {
        return `We have ${this.totalPets} total pets and ${this.totalOwners} total owners, so far!!!`
    }
    logStoreDetails() {
        console.log(this.storeDetails);
    }
}

const petOwnerStore = new PetOwnerStore();

  petOwnerStore.createPet({
    id: 1,
    name: "Bingo",
    type: "Dog",
    breed: "alsertian",
  });
  petOwnerStore.createPet({
    id: 2,
    name: "Lloyd",
    type: "Cat",
    breed: "winky",
  });
  petOwnerStore.createOwner({ id: 1, firstName: "Aleem", lastName: "Isiaka" });
  petOwnerStore.logStoreDetails(); // -> We have 2 pets and 1 owners, so far!!!