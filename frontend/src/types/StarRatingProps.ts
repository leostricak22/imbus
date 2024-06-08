type StarRatingProps = {
    rating: number;
    maxStars?: number;
    onRatingChange?: (rating: number) => void;
    starSize?: number;
    starColor?: string;
};