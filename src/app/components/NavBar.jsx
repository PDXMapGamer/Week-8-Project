"use client";
import Link from "next/link";

export default function NavBar(props) {
  return (
    <header>
      <nav>
        <Link className="mr-4 hover:underline hover:text-gray-500" href={`/${props.username}/homepage`}>
          Homepage
        </Link>
        <Link className="mr-4 hover:underline hover:text-gray-500" href={`/${props.username}/characters`}>
          View Characters
        </Link>
        <Link className="mr-4 hover:underline hover:text-gray-500" href={`/${props.username}/create-post`}>
          Create Post
        </Link>
        <Link className="mr-4 hover:underline hover:text-gray-500" href={`/${props.username}/view-post`}>
          View Posts
        </Link>
        <Link className="mr-4 hover:underline hover:text-gray-500" href={`/`}>
          Sign out
        </Link>
      </nav>
    </header>
  );
}
