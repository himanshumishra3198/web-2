import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
  return (
    <div>
      <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-48">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="flex text-gray-500 pr-2">
              <ShareIcon size="sm" />
            </div>
            {title}
          </div>
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              <ShareIcon size="sm" />
            </div>
            <div className="text-gray-500">
              <ShareIcon size="sm" />
            </div>
          </div>
        </div>
        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={"http://www.youtube.com/embed/" + link.split("?v=")[1]}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}