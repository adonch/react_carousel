import React, { useEffect, useRef, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite?: boolean;
};

enum Direction {
  next = 'next',
  prev = 'prev',
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(0);
    document.title = 'Carousel';
    if (listRef.current) {
      listRef.current.style.transform = `translateX(0px)`;
    }
  }, [frameSize, images.length]);

  function scrollToImage(direction: Direction) {
    const listNode = listRef.current;
    let newOffset =
      direction === Direction.next ? offset + step : offset - step;

    if (newOffset >= images.length - 1) {
      newOffset = images.length - frameSize;
    }

    if (newOffset < 0) {
      newOffset = 0;
    }

    if (listNode) {
      listNode.style.transform = `translateX(-${newOffset * itemWidth}px)`;
      setOffset(newOffset);
    }
  }

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{ width: frameSize * itemWidth }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: 1300,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
          ref={listRef}
        >
          {images.map((image, index) => {
            return (
              <li key={image}>
                <img src={image} alt={`${index + 1}`} width={itemWidth} />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => scrollToImage(Direction.prev)}
        disabled={offset === 0}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={() => scrollToImage(Direction.next)}
        disabled={offset === images.length - frameSize}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
