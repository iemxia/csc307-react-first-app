import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from './Form';
  
function MyApp() {
    const [characters, setCharacters] = useState([]);
    
    function fetchUsers(){
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }
    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => {console.log(error)});

    }, [] );

    function removeOneCharacter(id) {
        fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (response.status === 204) {
                const updated = characters.filter((character) => character.id !== id);
                setCharacters(updated);
            } else if (response.status === 404) {
                console.log('User not found');
            } else {
                console.log('Failed to delete with status code: ', response.status);
            }
        })
        .catch((error) => {
            console.log('Error while deleting: ', error);
        });
   
    }

    function updateList(person) {
        postUser(person)
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                console.log('User insertion failed with status code:',response.status);

            }
        })
        .then((newUser) => {
            if (newUser) {
                setCharacters([...characters, newUser]);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
        return promise;
    }

    

    return (
    <div className="container">
        <Table characterData={characters}
                removeCharacter = {removeOneCharacter}/>
        <Form handleSubmit={updateList}/>
    </div>
    );
}
    

export default MyApp;