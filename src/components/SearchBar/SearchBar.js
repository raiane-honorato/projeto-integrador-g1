import './searchBar.css';

function SearchBar() {
  return (
    <div>
      <label placeholder="search"></label>
      <input type="text" id="search-input" placeholder='Procure uma vaga' />
      <button className='buttonSearch'>
        <span className="material-icons lupa icons-outlined">search</span>
      </button>
    </div>
  );
}

export default SearchBar;
