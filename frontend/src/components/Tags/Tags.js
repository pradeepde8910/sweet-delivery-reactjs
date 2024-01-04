import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './tags.module.css';

export default function Tags({ tags, forFoodPage }) {
  const [showTags, setShowTags] = useState(false);

  const toggleShowTags = () => {
    setShowTags(!showTags);
  };

  return (
    <div className={classes.container}>
      {showTags && (
        <div className={classes.dropdown}>
          {tags.map((tag) => (
            <Link key={tag.name} to={`/tag/${tag.name}`}>
              <div className={classes.tag}>
                {tag.name}
                {!forFoodPage && `(${tag.count})`}
              </div>
            </Link>
          ))}
        </div>
      )}

      <button className={classes.toggleButton} onClick={toggleShowTags}>
        {showTags ? 'Hide Tags' : 'Show Tags'}
      </button>
    </div>
  );
}
