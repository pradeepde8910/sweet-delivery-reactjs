// Thumbnails.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import StarRating from '../StarRating/StarRating';
import classes from './thumbnails.module.css';

export default function Thumbnails({ sweets }) {
  return (
    <ul className={classes.list}>
      {sweets.map((sweet) => (
        <li key={sweet.id} className={classes.item}>
          <Link to={`/sweet/${sweet.id}`} className={classes.link}>
            <img
              className={classes.image}
              src={`${sweet.imageUrl}`}
              alt={sweet.name}
            />
            <div className={classes.content}>
              <div className={classes.name}>{sweet.name}</div>
              <div className={classes.stars}>
                <StarRating stars={sweet.stars} />
              </div>
              <div className={classes.footer}>
                {sweet.origins.length > 0 && (
                  <div className={classes.origins}>
                    {sweet.origins.map((origin) => (
                      <span key={origin}>{origin}</span>
                    ))}
                  </div>
                )}
                {sweet.description && (
                  <div className={classes.description}>
                    {Array.isArray(sweet.description) ? (
                      sweet.description.map((desc) => (
                        <span key={desc}>{desc}</span>
                      ))
                    ) : (
                      <span>{sweet.description}</span>
                    )}
                  </div>
                )}
                <div className={classes.price}>
                  <Price price={sweet.price} locale="en-IN" currency="INR" />
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
