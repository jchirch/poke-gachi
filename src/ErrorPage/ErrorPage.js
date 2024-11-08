import './ErrorPage.css';
import { useParams } from "react-router-dom";

function ErrorPage({error}) {
  const { code } = useParams();

  const errorCode = error || code || 404
  console.log("You received an error: ", errorCode);
  return (
    <div className="ErrorPage">
      <header className="Error-header">
        <p>
          You shouldn't be seeing this! Click the logo to head back to the main page. 
        </p>
      </header>
    </div>
  );
}

export default ErrorPage;
