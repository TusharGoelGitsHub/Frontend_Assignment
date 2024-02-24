import React, { useState, useEffect } from "react";
import { Card, Text, Group, Image, Button } from "@mantine/core";
import classes from "./CustomCard.module.css";
import { ICustomCardProps } from "./CustomCard.types";

const CustomCard: React.FC<ICustomCardProps> = (props: ICustomCardProps) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitials = async () => {
      try {
        const response = await fetch(
          `https://api.dicebear.com/7.x/initials/svg?seed=${props.name}`
        );
        if (!response.ok) {
          throw new Error("No Response");
        }
        setProfileImageUrl(response.url);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchInitials();
  }, [props.name]);

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <div className={classes.profileContainer}>
        {profileImageUrl && (
          <Image
            src={profileImageUrl}
            alt="Profile Image"
            className={classes.profileStyles}
            title={props.name}
          />
        )}
      </div>

      <Group justify="center" mt="md">
        <Text fz="md" fw={600} className={classes.title}>
          <div className={classes.flexContainer}>
            <span className={classes.name}>{props.name}</span>
            {props.isFollowing && (
              <span>
                <Image
                  src="/Images/star.svg"
                  alt="follow"
                  className={classes.follow}
                />
              </span>
            )}
          </div>
        </Text>
      </Group>

      <Group justify="space-between" mt="md">
        <Text
          fz="md"
          fw={400}
          className={classes.title}
          style={{ color: "#868e96" }}
        >
          <div className={classes.flexContainer}>
            <span>
              <Image
                src="/Images/at.svg"
                alt="follow"
                className={classes.follow}
              />
            </span>
            <a href={`mailto:${props.email}`} className={classes.links}>
              {props.email}
            </a>
          </div>
        </Text>
      </Group>
      <Group justify="space-between" mt="md">
        <Text
          fz="md"
          fw={400}
          className={classes.title}
          style={{ color: "#868e96" }}
        >
          <div className={classes.flexContainer}>
            <span>
              <Image
                src="/Images/phone-call.svg"
                alt="follow"
                className={classes.follow}
              />
            </span>
            <a href={`tel:${props.phone}`} className={classes.links}>
              {props.phone}
            </a>
          </div>
        </Text>
      </Group>
      <Group justify="space-between" mt="md">
        <Text
          fz="md"
          fw={400}
          className={classes.title}
          style={{ color: "#868e96" }}
        >
          <div className={classes.flexContainer}>
            <span>
              <Image
                src="/Images/world.svg"
                alt="follow"
                className={classes.follow}
              />
            </span>
            <a
              href={
                props.website.startsWith("http")
                  ? props.website
                  : `http://${props.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className={classes.links}
            >
              {props.website}
            </a>
          </div>
        </Text>
      </Group>

      <Group justify="space-between" mt="md">
        <Button
          variant="outline"
          className={
            props.isFollowing ? classes.unfollowStyles : classes.followStyles
          }
          onClick={() => props.handleFollowClick(props.id)}
        >
          <div className={classes.flexContainer}>
            <span>
              {props.isFollowing ? (
                <Image
                  src="/Images/user-minus.svg"
                  alt="follow"
                  className={classes.follow}
                />
              ) : (
                <Image
                  src="/Images/user-plus.svg"
                  alt="follow"
                  className={classes.follow}
                />
              )}
            </span>
            <span className={classes.title}>
              {props.isFollowing ? "Unfollow" : "Follow"}
            </span>
          </div>
        </Button>
        <Button
          variant="outline"
          color="#228be6"
          className={classes.delete}
          onClick={() => props.handleDeleteClick(props.id)}
        >
          <div className={classes.flexContainer}>
            <span>
              <Image
                src="/Images/trash.svg"
                alt="follow"
                className={classes.follow}
              />
            </span>
            <span className={classes.title}>Delete</span>
          </div>
        </Button>
      </Group>
    </Card>
  );
};

export default CustomCard;
