interface IComicRelateProps {
  authors: string[];
}

const ComicRelate = ({ authors }: IComicRelateProps) => {
  return (
    <div className="bg-white">
      <span>
        Tác phẩm cùng tác giả
        {authors.map((ele: any, index: number) => (
          <span key={index}>{" " + ele}</span>
        ))}
      </span>
    </div>
  );
};

export default ComicRelate;
