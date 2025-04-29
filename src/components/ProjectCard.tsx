
import styled from 'styled-components';


interface ProjectCardProps {
    title: string;
    description: string;
    author: string;
  }
// Componente de la tarjeta del proyecto
const ProjectCard = ({ title, description, author }: ProjectCardProps) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__content">
          <h3 className="card__title">{title}</h3>
          <p className="card__author">By: {author}</p>
          <p className="card__description">
            {description ? description : "No description available"}
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
}

// Estilos de la tarjeta con styled-components
const StyledWrapper = styled.div`
  .card {
    width: 240px;
    height: 220px;
    margin: 10px;
    background-color: #011522;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
  }

  .card__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .card__title {
    font-size: 18px;
    color: white;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .card__author {
    color: #ffbd44;
    margin-bottom: 10px;
  }

  .card__description {
    color: gray;
    font-size: 14px;
    margin-top: 5px;
    flex-grow: 1;
  }
`;

export default ProjectCard;
