import NavBar from "@/app/components/NavBar";
import Link from "next/link";

export default function homepage({ params }) {
  return (
    <section>
      <NavBar username={params.username} />
      <h1>Welcome {params.username}</h1>
      <Link href={`/${params.username}/homepage/view-posts`}>View Your Posts</Link>
      <br />
      <Link href={`/${params.username}/homepage/view-comments`}>View Your Comments</Link>
    </section>
  );
}
