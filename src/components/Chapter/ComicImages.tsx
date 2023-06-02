const ComicImages = (props: any) => {
  return (
    <div className="flex justify-center flex-col bg-white w-4/5 pt-20">
      {props.images.map((image: any, index: any) => (
        <img
          key={index}
          src={image}
          alt={`Comic Image ${index + 1}`}
          className="p-10 max-w-[100%] min-w-[80%]"
        />
      ))}
    </div>
  );
};

export default ComicImages;
