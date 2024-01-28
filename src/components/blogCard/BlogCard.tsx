import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FaExternalLinkAlt } from "react-icons/fa";

type BlogCard = {
  title: string;
  url: string;
  thumbnailUrl: string;
  date: string;
};

type BlogCardProps = {
  data: BlogCard;
};

export const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  return (
    <a href={data.url} target="_blank">
      <Card className="flex relative hover:[&:first-child]:text-primary-foreground">
        <div className="w-4 h-4 absolute top-2 right-2">
          <FaExternalLinkAlt />
        </div>
        <div>
          <CardHeader className="pr-0 flex h-full justify-center items-center">
            <img src={data.thumbnailUrl} alt={data.title} className="w-32" />
          </CardHeader>
        </div>
        <div className="flex items-center">
          <CardHeader className="w-full">
            <CardDescription>{data.date}</CardDescription>
            <CardTitle>{data.title}</CardTitle>
          </CardHeader>
        </div>
      </Card>
    </a>
  );
};
