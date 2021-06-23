import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./userdata.css";

function UserSubscriptionCart({subscription}) {

    //getting subscription's project data
    const [project, setProject] = useState();

    useEffect(() => {
        fetch(`http://localhost:8000/projects/${subscription.project_id}`)
          .then((res) => res.json())
          .then((res) => {
            setProject(res);
          })
          .catch(erro => alert('Não foi possível obter os projetos do usuário.'))
      }, [subscription.project_id]);

    //getting project's institution data
    const [institution, setInstitution] = useState();

    useEffect( () => {

        project && 
        fetch(`http://localhost:8000/institution/${project.institution_id}`)
        .then((res) => res.json())
        .then((res) => {setInstitution(res)})
        .catch(erro => alert("Não foi possível obter dados da instituição."))


    },[project]);

    return(
        <div className='project-data-details'  key={subscription.id}>
          <div>{project && institution &&
            <Fragment key={project.id}>
              <h3>{project.title} em {

              institution.institution_name

              }</h3>                           
            </Fragment>
          }</div>
           <p className={(subscription.subscription_status === 'Aceita') ? 'greenCard' : 'redCard'}>Situação da inscrição: {subscription.subscription_status}</p>
        </div>
    )


}

export default UserSubscriptionCart;