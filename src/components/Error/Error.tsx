import { ErrorProps } from "./Error.props";

function Error({ ...props }: ErrorProps): JSX.Element {
  return <div className="error" {...props}>
    <h2 className='error__error-message'>An error has occured, please try again :(</h2>
  </div>;
}

export default Error;
