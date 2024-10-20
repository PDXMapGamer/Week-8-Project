import NavBar from "@/app/components/NavBar";

export default function viewPosts({ params }) {
  return (
    <>
      <NavBar username={params.username} />
      <h1>View posts page</h1>
    </>
  );
}
