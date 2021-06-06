import './searchBar.css';
import { useHistory } from "react-router-dom";
import { useState } from "react";

function SearchBar() {
  const [q, setQ] = useState('');

  const history = useHistory();
  return (
    <div className='searchBlock'>
      <label placeholder="search"></label>
      <input 
      type="text" 
      id="search-input" 
      placeholder='Palavra chave ou habilidade'
      onChange = {(event) => {setQ(event.target.value)}}
      onKeyPress = {(event) => {
        if (event.key === 'Enter'){
        history.push(`/search/?q=${q}`)}}
        }></input>
       
      
      <button 
      className='buttonSearch' 
      onClick = {() => {history.push(`/search/?q=${q}`)}}>
        <span className="material-icons lupa icons-outlined">search</span>
      </button>

    </div>
  );
}

export default SearchBar;
