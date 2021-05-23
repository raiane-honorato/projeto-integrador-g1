import { useParams } from 'react-router-dom';

function ProjectPage() {
    const parameter = useParams();
    const projectId = parameter.id;

    return(
        <h1>{projectId}</h1>
    )
}

export default ProjectPage;