export default function Square(props) {
  let borderClass = "";
  switch (props.position) {
    case "0,0":
    case "0,1":
      borderClass = " border-r-2 border-b-2"
      break;
    case "1,0":
    case "1,1":
      borderClass = " border-b-2"
      break;
    case "2,0":
    case "2,1":
      borderClass = " border-l-2 border-b-2"
      break;
    case "0,2":
      borderClass = " border-r-2"
      break;
    case "2,2":
      borderClass = " border-l-2"
      break;
  }
  return (
    <button
      className={
        "h-20 w-20 border-black text-2xl" +
        borderClass +
        (props.winner ? " text-green-600 font-extrabold" : " font-thin ")
      }
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}