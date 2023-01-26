import React from "react";
import { useState, useEffect, useRef } from "react";
import { nanoid } from 'nanoid'
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import styled from "styled-components";


const Wrapper = styled.div`
  width: 300px;
  margin-left: 50px;
  h1 {
    font-size: 2.1em;
    text-align: right;
  }
  h2 {
    font-size: 2.1em;
  }
  span {
    color: skyblue;
  }
`

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
  const isFirstRender = useRef(true)

  useEffect(() => {
    const people = JSON.parse(localStorage.getItem("contacts")) ;
    if (isFirstRender.current && people) {
      setContacts(people);
      isFirstRender.current = false;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts]);

  const submitHandler = data => {
    const normalizedName = data.name.toLowerCase();
    contacts.find(contact => contact.name.toLowerCase() === normalizedName) ? 
      alert(`${data.name} is already in contacts `) :
    setContacts(contacts => [...contacts, {id: nanoid(), name: data.name, number: data.number}])
  }

  const onInputChange = (event) => {
    setFilter(event.target.value)
  }
  
  const deleteHandler = (contactID) => {
    setContacts(contacts => contacts.filter(contact => contact.id !== contactID))
  }

  return (
      <Wrapper>
      <h1><span>P</span>honebook</h1>
      <ContactForm onSubmit={submitHandler} />
      <h2>Contact<span>s</span></h2>
      <Filter inputChangeHandler={onInputChange} filterValue={filter} />
      <ContactList contacts={contacts} filter={filter} deleteHandler={deleteHandler} />
      </Wrapper>
    
   )
}