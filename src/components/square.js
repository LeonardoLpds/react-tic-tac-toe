export default function Square(props) {
  return (
    <button className={"square" + (props.winner ? " winner-square" : "")} onClick={props.onClick}>
      {props.value}
    </button>
  );
}