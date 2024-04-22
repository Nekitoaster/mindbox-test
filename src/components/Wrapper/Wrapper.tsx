import { WrapperProps } from "./Wrapper.props";

function Wrapper({ children, ...props }: WrapperProps): JSX.Element {
  

  return (
    <div className='wrapper' {...props}>
      {children}
    </div>
  );
}

export default Wrapper;
