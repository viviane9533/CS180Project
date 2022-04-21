import React from 'react';
import styled from "styled-components";

const SearchBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 34em;
    height: 3.8em;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 2px 12px 3px rgba(0, 0, 0.14);
    overflow: hidden;
`;

const SearchInputContainer = styled.div`
width: 100%;
min-height: 4em;
display: flex;
align-items: center;
position: relative;
padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #12112e;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`

export function putton(props){
    return <Button></Button>
    
    }
export function SearchBar(props){
return <SearchBarContainer>
    <SearchInputContainer>
        <SearchInput placeholder="Search for Players" />
    </SearchInputContainer>
</SearchBarContainer>

}