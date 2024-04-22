import { EmptyProps } from "./Empty.props";

function Empty({ ...props }: EmptyProps): JSX.Element {
  return (
    <div className="empty" {...props}>
      <h2>It's still empty here</h2>
    </div>
  );
}

export default Empty;
