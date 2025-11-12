import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="mb-4 text-slate-600">Page not found</p>
        <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded">
          Go Home
        </Link>
      </div>
    </div>
  );
}
