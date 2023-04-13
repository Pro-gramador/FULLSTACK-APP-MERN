import React from "react";
import { Link } from "react-router-dom";

import { img_300, img_301, img_not_available } from "../../config";

export const MovieCard = ({ data, mediaType }) => {

  const id = data.id;
  const media_type = data.media_type? data.media_type: data.type? data.type: mediaType;

  const imgURL = data.media_type ? img_300 + data.poster_path : img_301 + data.poster_path || img_not_available;
  const title = data.name || data.original_title;
  const original_language = data.original_language || '';
  const release_date = data.release_date || data.first_air_date;

  return (
    <>
      <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
        <Link to={`/details/${id}/${media_type}`} className="video-thumb">
          <figure className="video-image">
            <span>
              <img src={imgURL} alt={title} />
            </span>
            <div className="hd">
              <b>{media_type}</b>
              <b>{original_language}</b>
            </div>
          </figure>
          <div className="video-content">
            <ul className="tags">
                <li>Release date</li>
            </ul>
            <small className="range">{release_date}</small>
            <h3 className="name">{title}</h3>
          </div>
        </Link>
      </div>
    </>
  );
};