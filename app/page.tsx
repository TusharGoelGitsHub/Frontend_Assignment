"use client";

import { useEffect, useState } from "react";
import CustomCard from "./CustomCard/CustomCard";
import { ICustomCardProps } from "./CustomCard/CustomCard.types";
import classes from "./CustomCard/CustomCard.module.css";

export default function HomePage() {
  const [users, setUsers] = useState<ICustomCardProps[]>([]);
  const [isFollowing, setIsFollowing] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("No Users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleFollowClick = (id: string) => {
    setIsFollowing({ ...isFollowing, [id]: !isFollowing[id] });
  };

  const handleDeleteClick = (id: string) => {
    let updatedUsers = { ...users };
    updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className={classes.container}>
      <div className={classes.row}>
        {users.map((user, index) => (
          <div key={index} className={classes.cardWrapper}>
            <CustomCard
              id={user.id}
              name={user.name}
              email={user.email}
              phone={user.phone}
              website={user.website}
              isFollowing={isFollowing[user.id]}
              handleDeleteClick={handleDeleteClick}
              handleFollowClick={handleFollowClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
