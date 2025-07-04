import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaHeart, FaLongArrowAltRight } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";

const AllRecipe = () => {
  const data = useLoaderData();
  const [count, setCount] = useState(0);
  const [selectedCousine, setSelectedCousine] = useState("All");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (selectedCousine === "All") {
      setFilteredData(data);
    } else {
      const filteredData = data.filter(
        (r) => r.cousine?.toLowerCase() === selectedCousine.toLowerCase()
      );
      setFilteredData(filteredData);
    }
  }, [selectedCousine, data]);

  const cousines = ["All", ...new Set(data.map((r) => r.cousine))];
  return (
    <>
      <Helmet>
        <title>All Recipe | Cook_verse</title>
      </Helmet>

      {/*  dropdown  */}
      <div>
        <label className="font-semibold mr-2">Filter by Cuisine</label>
        <select
          className="select select-bordered"
          value={selectedCousine}
          onChange={(e) => selectedCousine(e.target.value)}
        >
          {cousines.map((cousine) => (
            <option>{cousine}</option>
          ))}
        </select>
      </div>
      {/*  recipe  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 flex-wrap">
        {data.map((recipe, index) => (
          <div key={index} className="max-w-3xl mx-auto p-2">
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-72 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold capitalize">
                  {recipe.title}
                </h2>
                <p>
                  <span className="font-semibold">Cuisine:</span>{" "}
                  {recipe.cuisine}
                </p>
                <p>
                  <span className="font-semibold">Preparation Time:</span>{" "}
                  {recipe.preparation_time} minutes
                </p>

                <p>
                  <span className="font-semibold">Categories:</span>{" "}
                  {recipe.selectedCategories?.join(", ")}
                </p>
                <div className="flex mt-3">
                  <p>
                    <span className="font-semibold">Likes:</span>{" "}
                    {recipe.likeCount}
                  </p>
                  <Link className="btn btn-xs" to={`/recipe/${recipe._id}`}>
                    View Details <FaLongArrowAltRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllRecipe;
