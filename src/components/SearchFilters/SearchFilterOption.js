
import { useState } from "react";

function SearchFilterOption({entity, type, filterParams, setFilterParams, setFilterStatus}) {
    return (
      <>
          {entity &&
              (<label className="manage-projects-filter-option">
                  <input
                      className="manage-projects-filter-checkbox"
                      type="radio"
                      name={entity.label}
                      checked={type == 'cause' ? filterParams.cause == entity:filterParams.hability == entity}
                      onChange={(event) => 
                        type == 'cause'?  setFilterParams({ ...filterParams, 'cause': entity }) : setFilterParams({ ...filterParams, 'hability': entity })
               
                    }
                  ></input>
                  <span className="manage-projects-filter-text">{entity.label}</span>
              </label>)
          }
      </>
  );
}

export default SearchFilterOption;
