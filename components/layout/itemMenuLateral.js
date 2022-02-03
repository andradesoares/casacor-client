import classes from './menuLateral.module.scss';

function ItemMenuLateral({ item, style, setDisplay }) {
  return (
    <>
      <p
        style={{
          ...style,
        }}
        onClick={() => {
          setDisplay(item);
        }}
        className={classes.linkButton}
      >
        {item}
      </p>
    </>
  );
}

export default ItemMenuLateral;
