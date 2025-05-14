import React from 'react';
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <span>404 Error Page Not Found</span><br/>
      <Link to="/">Go Back</Link>
    </div>
  )
}

export default PageNotFound