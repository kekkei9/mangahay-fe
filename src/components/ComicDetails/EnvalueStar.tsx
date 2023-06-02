import classes from "./ComicDetail.module.sass";

const list_star = Array.from(Array(5).keys());

const EnvalueStar = (props: any) => {
  return (
    <div className={classes.detailinfo__evaluate__star}>
      <span className={classes.evaluate__star__default}>
        <span>
          <span style={props.percent_rating}>
            {/* {list_star.map((ele) => (
                                <FontAwesomeIcon className={classes.evaluate__star} icon={faStar} onClick={() => props.evaluteStarComic(ele)} style={{ 'cursor': 'pointer' }} />
                            ))} */}
          </span>
        </span>

        <span className={classes.evaluate__star__copy2}>
          {/* {list_star.map((ele) => (
                            <FontAwesomeIcon className={classes.evaluate__star} icon={faStar} onClick={() => props.evaluteStarComic(ele)} style={{ 'cursor': 'pointer' }} />
                        ))} */}
        </span>
      </span>
      <span>{props.comic.star}</span>
    </div>
  );
};

export default EnvalueStar;
