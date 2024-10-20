import NavBar from "@/app/components/NavBar";

export default function createPosts({ params }) {
  return (
    <>
      <NavBar username={params.username} />
      <h1>create posts page</h1>
    </>
  );
}
