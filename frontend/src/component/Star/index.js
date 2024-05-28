const RatingStars = ({ disabled, rating, setRating }) => {
  const handleStarClick = (starValue) => {
    if (!disabled) {
      setRating(starValue);
    }
  };

  return (
    <div className="rating-stars">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            style={{
              cursor: "pointer",
              color: rating >= starValue ? "#FFE234" : "gray",
            }}
            onClick={() => handleStarClick(starValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};
export default RatingStars;
