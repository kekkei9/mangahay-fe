import classes from "./ComicDetail.module.sass";
import { Skeleton } from "primereact/skeleton";

const ComicRelate = (props: any) => {
  return (
    <div className="bg-white">
      <div className={classes.boxcard}>
        <div className={classes.boxcard__title}>
          {/* <FontAwesomeIcon icon={faFire} /> */}
          {props.authors ? (
            <span>
              Tác phẩm cùng tác giả
              {props.authors &&
                props.authors.map((ele: any, index: number) => (
                  <span key={index}>{" " + ele}</span>
                ))}
            </span>
          ) : (
            <Skeleton height="25" width="200" animation="wave" />
          )}
        </div>
        <div className={classes.boxcard__body}>
          {/* <Grid container spacing={1}>
                    <Grid item md={12}>
                        {
                            props.comics_author && props.comics_author.map((ele: any) => (
                                <BodyComicAuthor key={ele.id} comic={ele} />
                            ))
                        }
                    </Grid>
                </Grid> */}
        </div>
        {/* {props.comics_author.length !== 0 && (
          <a href="/" className="boxcard__footer">
            Xem thêm
          </a>
        )} */}
      </div>
    </div>
  );
};

export default ComicRelate;
