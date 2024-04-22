
import { LoaderProps } from "./Loader.props";


function Loader({ ...props }: LoaderProps): JSX.Element {

  return (
    <div {...props} className='loader'></div>
  );
}

export default Loader;
